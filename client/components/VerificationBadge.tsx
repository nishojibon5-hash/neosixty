import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  isVerified: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VerificationBadge({ isVerified, size = "md", className }: VerificationBadgeProps) {
  if (!isVerified) return null;

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  return (
    <div title="Verified account">
      <CheckCircle
        className={cn(
          "text-blue-500 fill-blue-500 drop-shadow-sm",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}

interface FollowerStatsProps {
  followerCount: number;
  followingCount: number;
  className?: string;
}

export function FollowerStats({ followerCount, followingCount, className }: FollowerStatsProps) {
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className={cn("flex gap-4 text-sm text-muted-foreground", className)}>
      <span>
        <strong className="text-foreground">{formatCount(followerCount)}</strong> followers
      </span>
      <span>
        <strong className="text-foreground">{formatCount(followingCount)}</strong> following
      </span>
    </div>
  );
}

// Function to check if user should be verified based on follower count
export function shouldBeVerified(followerCount: number): boolean {
  return followerCount >= 1000;
}
