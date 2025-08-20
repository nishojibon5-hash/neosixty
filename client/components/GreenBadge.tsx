import { cn } from "@/lib/utils";

interface GreenBadgeProps {
  followerCount: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GreenBadge({ followerCount, size = "md", className }: GreenBadgeProps) {
  // Show green badge for 1k+ followers but less than verified threshold
  if (followerCount < 1000) return null;

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center relative",
        sizeClasses[size],
        className
      )}
      title={`${followerCount >= 1000 ? '1K+' : followerCount} followers`}
    >
      {/* Green Star Badge Background */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
      >
        {/* Star burst shape */}
        <path
          d="M50 5 L55 25 L75 15 L65 35 L85 40 L65 50 L85 60 L65 65 L75 85 L55 75 L50 95 L45 75 L25 85 L35 65 L15 60 L35 50 L15 40 L35 35 L25 15 L45 25 Z"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="1"
        />
        
        {/* 60 Text */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#065f46"
          fontSize="24"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          60
        </text>
        
        {/* Underline */}
        <line
          x1="35"
          y1="60"
          x2="65"
          y2="60"
          stroke="#065f46"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

// Function to check if user should have green badge
export function shouldHaveGreenBadge(followerCount: number, isVerified: boolean): boolean {
  return followerCount >= 1000 && !isVerified;
}
