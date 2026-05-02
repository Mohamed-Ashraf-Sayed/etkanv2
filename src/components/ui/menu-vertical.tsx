"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

type MenuItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
  onItemClick?: () => void;
}

const MotionLink = motion.create(Link);

export const MenuVertical = ({
  menuItems = [],
  color = "#D4AF37",
  skew = 0,
  onItemClick,
}: MenuVerticalProps) => {
  return (
    <div className="flex w-fit flex-col gap-3 px-6">
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.href}-${index}`}
          className="group/nav flex items-center gap-2 cursor-pointer text-white"
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            variants={{
              initial: { x: "100%", color: "inherit", opacity: 0 },
              hover: { x: 0, color, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="z-0"
          >
            <ArrowLeft strokeWidth={3} className="size-7 md:size-8" />
          </motion.div>

          <MotionLink
            href={item.href as any}
            onClick={onItemClick}
            variants={{
              initial: { x: 40, color: item.isActive ? color : "inherit" },
              hover: { x: 0, color, skewX: skew },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-bold font-cairo text-2xl md:text-3xl no-underline"
          >
            {item.label}
          </MotionLink>
        </motion.div>
      ))}
    </div>
  );
};
