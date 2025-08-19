import { Users, Bookmark, Clock, Calendar, MessageCircle, Store, Video, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-80 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-2">
      {/* User Profile */}
      <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <span className="ml-3 font-medium">Md Salman</span>
      </Button>

      {/* Main Menu Items */}
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <Users className="h-6 w-6 text-primary" />
          <span className="ml-3">Friends</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <Clock className="h-6 w-6 text-blue-500" />
          <span className="ml-3">Memories</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <Bookmark className="h-6 w-6 text-purple-500" />
          <span className="ml-3">Saved</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <Users className="h-6 w-6 text-blue-600" />
          <span className="ml-3">Groups</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <Video className="h-6 w-6 text-blue-500" />
          <span className="ml-3">Video</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <Store className="h-6 w-6 text-blue-600" />
          <span className="ml-3">Marketplace</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <Calendar className="h-6 w-6 text-red-500" />
          <span className="ml-3">Events</span>
        </Button>
      </div>

      <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
        <span className="ml-3">See more</span>
      </Button>

      <Separator className="my-4" />

      {/* Shortcuts */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-muted-foreground px-3">Your shortcuts</h3>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">R</span>
          </div>
          <span className="ml-3">React Developers</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">W</span>
          </div>
          <span className="ml-3">Web Developers</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <span className="ml-3">Tech News</span>
        </Button>
      </div>
    </aside>
  );
}
