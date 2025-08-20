import { ChevronDown, Home, Users, Store, Video, Calendar, Bookmark, Clock, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

export function HomeMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <span>Menu</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        
        <Link to="/">
          <DropdownMenuItem className="flex items-center gap-3 p-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Home className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Home</p>
              <p className="text-xs text-muted-foreground">Your main feed</p>
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <Users className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <p className="font-medium">Friends</p>
            <p className="text-xs text-muted-foreground">Connect with people</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Store className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <p className="font-medium">Marketplace</p>
            <p className="text-xs text-muted-foreground">Buy and sell items</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
            <Video className="h-4 w-4 text-red-600" />
          </div>
          <div>
            <p className="font-medium">Watch</p>
            <p className="text-xs text-muted-foreground">Videos and shows</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <p className="font-medium">Events</p>
            <p className="text-xs text-muted-foreground">Discover events</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>More Tools</DropdownMenuLabel>

        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Bookmark className="h-4 w-4 text-yellow-600" />
          </div>
          <div>
            <p className="font-medium">Saved</p>
            <p className="text-xs text-muted-foreground">Your saved posts</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Clock className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">Memories</p>
            <p className="text-xs text-muted-foreground">Your past posts</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <Settings className="h-4 w-4" />
          <span>Settings & Privacy</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <HelpCircle className="h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-3 p-3 text-red-600">
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
