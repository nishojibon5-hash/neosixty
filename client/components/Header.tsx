import { Search, Home, Users, MessageCircle, Bell, Grid3X3, Menu } from "lucide-react";
import { LogoWithText } from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left: Logo and Search */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <LogoWithText className="hidden sm:flex" />
          <div className="sm:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search Neo sixty" 
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary">
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary">
            <Users className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary">
            <MessageCircle className="h-6 w-6" />
          </Button>
        </nav>

        {/* Right: Profile and Menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Grid3X3 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
