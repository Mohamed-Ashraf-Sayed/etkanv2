import { cn } from "@/lib/utils";

interface ProjectThumbnailProps {
  category: "website" | "mobile" | "systems" | "infrastructure";
  title: string;
  className?: string;
  size?: "sm" | "lg";
}

function WebsiteMockup() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-full">
      <rect x="20" y="15" width="360" height="230" rx="10" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      <rect x="20" y="15" width="360" height="32" rx="10" fill="currentColor" fillOpacity="0.06" />
      <rect x="20" y="37" width="360" height="1" fill="currentColor" fillOpacity="0.1" />
      <circle cx="40" cy="31" r="4" fill="currentColor" fillOpacity="0.2" />
      <circle cx="54" cy="31" r="4" fill="currentColor" fillOpacity="0.15" />
      <circle cx="68" cy="31" r="4" fill="currentColor" fillOpacity="0.1" />
      <rect x="90" y="24" width="200" height="14" rx="7" fill="currentColor" fillOpacity="0.06" />
      <rect x="30" y="50" width="350" height="24" rx="4" fill="currentColor" fillOpacity="0.04" />
      <rect x="300" y="54" width="60" height="16" rx="8" fill="currentColor" fillOpacity="0.15" />
      <rect x="40" y="85" width="180" height="14" rx="3" fill="currentColor" fillOpacity="0.2" />
      <rect x="40" y="106" width="140" height="10" rx="3" fill="currentColor" fillOpacity="0.1" />
      <rect x="40" y="122" width="160" height="10" rx="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="40" y="145" width="90" height="28" rx="14" fill="currentColor" fillOpacity="0.15" />
      <rect x="250" y="82" width="120" height="95" rx="8" fill="currentColor" fillOpacity="0.08" />
      <rect x="40" y="190" width="100" height="45" rx="6" fill="currentColor" fillOpacity="0.06" />
      <rect x="150" y="190" width="100" height="45" rx="6" fill="currentColor" fillOpacity="0.06" />
      <rect x="260" y="190" width="100" height="45" rx="6" fill="currentColor" fillOpacity="0.06" />
    </svg>
  );
}

function MobileMockup() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-full">
      <rect x="135" y="8" width="130" height="244" rx="18" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <rect x="170" y="12" width="60" height="14" rx="7" fill="currentColor" fillOpacity="0.1" />
      <rect x="148" y="32" width="40" height="6" rx="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="148" y="48" width="104" height="16" rx="4" fill="currentColor" fillOpacity="0.12" />
      <circle cx="175" cy="85" r="14" fill="currentColor" fillOpacity="0.1" />
      <rect x="196" y="78" width="50" height="8" rx="2" fill="currentColor" fillOpacity="0.12" />
      <rect x="196" y="90" width="35" height="6" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="148" y="110" width="104" height="40" rx="8" fill="currentColor" fillOpacity="0.06" />
      <rect x="155" y="118" width="60" height="6" rx="2" fill="currentColor" fillOpacity="0.1" />
      <rect x="155" y="130" width="80" height="6" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="148" y="158" width="104" height="40" rx="8" fill="currentColor" fillOpacity="0.06" />
      <rect x="155" y="166" width="70" height="6" rx="2" fill="currentColor" fillOpacity="0.1" />
      <rect x="155" y="178" width="55" height="6" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="155" y="210" width="90" height="24" rx="12" fill="currentColor" fillOpacity="0.12" />
      <rect x="175" y="240" width="50" height="4" rx="2" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

function SystemsMockup() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-full">
      <rect x="20" y="15" width="360" height="230" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="20" y="15" width="70" height="230" rx="10" fill="currentColor" fillOpacity="0.06" />
      <circle cx="55" cy="38" r="10" fill="currentColor" fillOpacity="0.1" />
      <rect x="34" y="60" width="42" height="5" rx="2" fill="currentColor" fillOpacity="0.08" />
      <rect x="34" y="75" width="42" height="5" rx="2" fill="currentColor" fillOpacity="0.05" />
      <rect x="34" y="90" width="42" height="5" rx="2" fill="currentColor" fillOpacity="0.05" />
      <rect x="100" y="48" width="85" height="50" rx="6" fill="currentColor" fillOpacity="0.06" />
      <rect x="195" y="48" width="85" height="50" rx="6" fill="currentColor" fillOpacity="0.06" />
      <rect x="290" y="48" width="80" height="50" rx="6" fill="currentColor" fillOpacity="0.06" />
      <rect x="110" y="60" width="40" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="205" y="60" width="35" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="300" y="60" width="45" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="100" y="108" width="172" height="95" rx="8" fill="currentColor" fillOpacity="0.04" />
      <rect x="120" y="170" width="16" height="25" rx="2" fill="currentColor" fillOpacity="0.18" />
      <rect x="145" y="155" width="16" height="40" rx="2" fill="currentColor" fillOpacity="0.22" />
      <rect x="170" y="165" width="16" height="30" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="195" y="140" width="16" height="55" rx="2" fill="currentColor" fillOpacity="0.25" />
      <rect x="220" y="150" width="16" height="45" rx="2" fill="currentColor" fillOpacity="0.2" />
      <rect x="282" y="108" width="88" height="95" rx="8" fill="currentColor" fillOpacity="0.04" />
      <rect x="290" y="120" width="72" height="6" rx="2" fill="currentColor" fillOpacity="0.08" />
      <rect x="290" y="134" width="72" height="6" rx="2" fill="currentColor" fillOpacity="0.05" />
      <rect x="290" y="148" width="72" height="6" rx="2" fill="currentColor" fillOpacity="0.05" />
    </svg>
  );
}

function InfrastructureMockup() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-full">
      <rect x="60" y="30" width="120" height="200" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="70" y="45" width="100" height="22" rx="4" fill="currentColor" fillOpacity="0.08" />
      <circle cx="80" cy="56" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="90" cy="56" r="3" fill="currentColor" fillOpacity="0.2" />
      <rect x="70" y="75" width="100" height="22" rx="4" fill="currentColor" fillOpacity="0.08" />
      <circle cx="80" cy="86" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="90" cy="86" r="3" fill="currentColor" fillOpacity="0.2" />
      <rect x="70" y="105" width="100" height="22" rx="4" fill="currentColor" fillOpacity="0.08" />
      <circle cx="80" cy="116" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="90" cy="116" r="3" fill="currentColor" fillOpacity="0.2" />
      <rect x="70" y="135" width="100" height="22" rx="4" fill="currentColor" fillOpacity="0.08" />
      <circle cx="80" cy="146" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="90" cy="146" r="3" fill="currentColor" fillOpacity="0.2" />
      <rect x="220" y="30" width="150" height="100" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="230" y="42" width="60" height="8" rx="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="240" cy="68" r="5" fill="currentColor" fillOpacity="0.2" />
      <rect x="252" y="64" width="50" height="6" rx="2" fill="currentColor" fillOpacity="0.06" />
      <circle cx="240" cy="84" r="5" fill="currentColor" fillOpacity="0.2" />
      <rect x="252" y="80" width="45" height="6" rx="2" fill="currentColor" fillOpacity="0.06" />
      <circle cx="240" cy="100" r="5" fill="currentColor" fillOpacity="0.2" />
      <rect x="252" y="96" width="55" height="6" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="220" y="145" width="150" height="85" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
      <polyline points="235,205 255,195 275,200 295,180 315,185 335,170 355,175" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="180" y1="60" x2="220" y2="60" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4" />
      <line x1="180" y1="90" x2="220" y2="90" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4" />
    </svg>
  );
}

const mockups: Record<string, React.FC> = {
  website: WebsiteMockup,
  mobile: MobileMockup,
  systems: SystemsMockup,
  infrastructure: InfrastructureMockup,
};

export default function ProjectThumbnail({
  category,
  title,
  className,
  size = "sm",
}: ProjectThumbnailProps) {
  const Mockup = mockups[category] || WebsiteMockup;

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border border-accent/20 bg-navy/50",
        size === "sm" ? "aspect-video" : "aspect-[16/10]",
        className
      )}
      aria-label={`صورة مشروع: ${title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/40 to-accent/5" />
      <div className="absolute inset-0 flex items-center justify-center text-accent/70 p-2">
        <Mockup />
      </div>
    </div>
  );
}
