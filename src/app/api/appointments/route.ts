import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Time slots available for booking (same as booking.ts)
const AVAILABLE_SLOTS = [
  { id: "m1", time: "09:00", label: "9:00 AM", labelAr: "٩:٠٠ ص" },
  { id: "m2", time: "09:45", label: "9:45 AM", labelAr: "٩:٤٥ ص" },
  { id: "m3", time: "10:30", label: "10:30 AM", labelAr: "١٠:٣٠ ص" },
  { id: "m4", time: "11:15", label: "11:15 AM", labelAr: "١١:١٥ ص" },
  { id: "a1", time: "13:00", label: "1:00 PM", labelAr: "١:٠٠ م" },
  { id: "a2", time: "13:45", label: "1:45 PM", labelAr: "١:٤٥ م" },
  { id: "a3", time: "14:30", label: "2:30 PM", labelAr: "٢:٣٠ م" },
  { id: "a4", time: "15:15", label: "3:15 PM", labelAr: "٣:١٥ م" },
];

// In-memory lock to prevent race conditions during booking
const pendingLocks = new Set<string>();

function getLockKey(date: string, timeSlot: string) {
  return `${date}:${timeSlot}`;
}

/**
 * GET /api/appointments?date=2026-03-15
 * Returns available time slots for a given date
 */
export async function GET(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`appointments-check:${ip}`, 30, 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "date parameter required" }, { status: 400 });
  }

  // Validate date format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD" }, { status: 400 });
  }

  // Don't allow past dates
  const requestedDate = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (requestedDate < today) {
    return NextResponse.json({ error: "Cannot check past dates" }, { status: 400 });
  }

  // Check day of week - Friday (5) and Saturday (6) are off
  const dayOfWeek = requestedDate.getDay();
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    return NextResponse.json({
      date,
      availableSlots: [],
      message: "No appointments available on weekends (Friday & Saturday)",
    });
  }

  try {
    // Find all booked slots for this date (non-cancelled)
    const bookedSlots = await prisma.booking.findMany({
      where: {
        date,
        NOT: { status: "cancelled" },
      },
      select: { timeSlot: true },
    });

    const bookedSlotIds = new Set(
      bookedSlots.map((b) => b.timeSlot).filter(Boolean)
    );

    // Also exclude currently locked slots (being booked right now)
    const availableSlots = AVAILABLE_SLOTS.filter(
      (slot) =>
        !bookedSlotIds.has(slot.id) && !pendingLocks.has(getLockKey(date, slot.id))
    );

    return NextResponse.json({
      date,
      availableSlots: availableSlots.map((s) => ({
        id: s.id,
        time: s.time,
        label: s.label,
        labelAr: s.labelAr,
      })),
      totalSlots: AVAILABLE_SLOTS.length,
      bookedCount: bookedSlotIds.size,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Appointments check error:", errMsg, error);
    return NextResponse.json({ error: "Server error", details: errMsg }, { status: 500 });
  }
}

/**
 * POST /api/appointments
 * Book a specific time slot with lock protection
 * Body: { date, timeSlot, name, phone, service? }
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`appointments-book:${ip}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { date, timeSlot, name, phone, service } = await req.json();

    if (!date || !timeSlot || !name || !phone) {
      return NextResponse.json(
        { error: "date, timeSlot, name, and phone are required" },
        { status: 400 }
      );
    }

    // Validate date
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    // Validate slot exists
    const slotInfo = AVAILABLE_SLOTS.find((s) => s.id === timeSlot);
    if (!slotInfo) {
      return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
    }

    // Don't allow past dates
    const requestedDate = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (requestedDate < today) {
      return NextResponse.json({ error: "Cannot book past dates" }, { status: 400 });
    }

    // Check weekend
    const dayOfWeek = requestedDate.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return NextResponse.json({ error: "Cannot book on weekends" }, { status: 400 });
    }

    const lockKey = getLockKey(date, timeSlot);

    // Check if slot is being locked by another request
    if (pendingLocks.has(lockKey)) {
      return NextResponse.json(
        { error: "This slot is being booked by someone else. Please choose another time." },
        { status: 409 }
      );
    }

    // Acquire lock
    pendingLocks.add(lockKey);

    try {
      // Double-check: is slot already booked in DB?
      const existing = await prisma.booking.findFirst({
        where: {
          date,
          timeSlot,
          NOT: { status: "cancelled" },
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: "This time slot is already booked. Please choose another time." },
          { status: 409 }
        );
      }

      // Book it
      const booking = await prisma.booking.create({
        data: {
          type: "consultation",
          status: "pending",
          name,
          email: "",
          phone,
          date,
          timeSlot,
          serviceType: service || null,
          notes: "Booked via AI voice call",
        },
      });

      return NextResponse.json({
        success: true,
        bookingId: booking.id,
        date,
        time: slotInfo.time,
        timeLabel: slotInfo.label,
        timeLabelAr: slotInfo.labelAr,
        name,
      });
    } finally {
      // Release lock
      pendingLocks.delete(lockKey);
    }
  } catch (error) {
    console.error("Appointment booking error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
