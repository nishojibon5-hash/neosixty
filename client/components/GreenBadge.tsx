import { cn } from "@/lib/utils";

interface GreenBadgeProps {
  followerCount: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GreenBadge({ followerCount, size = "md", className }: GreenBadgeProps) {
  // Show green badge for 1k+ followers
  if (followerCount < 1000) return null;

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center relative flex-shrink-0",
        sizeClasses[size],
        className
      )}
      title={`${followerCount >= 1000 ? '1K+' : followerCount} followers`}
    >
      {/* Perfect Circle Background with Star Burst */}
      <div className="relative w-full h-full">
        <svg 
          viewBox="0 0 48 48" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}
        >
          {/* Outer Circle */}
          <circle
            cx="24"
            cy="24"
            r="23"
            fill="#22c55e"
            stroke="#16a34a"
            strokeWidth="1"
          />
          
          {/* Inner Shadow Circle */}
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="#16a34a"
            opacity="0.3"
          />
          
          {/* Main Content Circle */}
          <circle
            cx="24"
            cy="24"
            r="18"
            fill="#22c55e"
          />
          
          {/* 60 Text */}
          <text
            x="24"
            y="24"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize="12"
            fontWeight="bold"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            60
          </text>
          
          {/* Underline */}
          <line
            x1="18"
            y1="28"
            x2="30"
            y2="28"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          {/* Small highlight for depth */}
          <circle
            cx="20"
            cy="18"
            r="2"
            fill="#34d399"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}

// Function to check if user should have green badge
export function shouldHaveGreenBadge(followerCount: number): boolean {
  return followerCount >= 1000;
}
