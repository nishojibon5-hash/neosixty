import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface BackButtonProps {
  className?: string;
  fallbackTo?: string;
}

export function BackButton({ className, fallbackTo = "/" }: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // If we can go back in history, do that
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Otherwise go to fallback route
      navigate(fallbackTo);
    }
  };

  // Don't show back button on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center gap-2 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">Back</span>
    </Button>
  );
}
