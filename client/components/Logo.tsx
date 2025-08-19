import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white";
}

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xl",
    md: "w-10 h-10 text-2xl",
    lg: "w-12 h-12 text-3xl",
    xl: "w-16 h-16 text-4xl"
  };

  const colorClasses = {
    default: "text-primary",
    white: "text-white"
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 font-bold shadow-lg",
        sizeClasses[size],
        className
      )}
    >
      <span className={cn("font-black", colorClasses.white)}>
        N60
      </span>
    </div>
  );
}

export function LogoWithText({ className, variant = "default" }: { className?: string; variant?: "default" | "white" }) {
  const textColor = variant === "white" ? "text-white" : "text-primary";
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Logo variant={variant} />
      <span className={cn("text-2xl font-bold", textColor)}>
        Neo sixty
      </span>
    </div>
  );
}
