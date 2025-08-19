import { Search, MoreHorizontal, Video, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

export function RightSidebar() {
  return (
    <aside className="hidden xl:block w-80 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-4">
      {/* Sponsored */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-muted-foreground">Sponsored</h3>
        
        <div className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
          <div className="flex gap-3">
            <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0"></div>
            <div className="space-y-1">
              <h4 className="font-medium">New Tech Course</h4>
              <p className="text-sm text-muted-foreground">Learn React & Next.js from scratch</p>
              <p className="text-xs text-muted-foreground">example.com</p>
            </div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
          <div className="flex gap-3">
            <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex-shrink-0"></div>
            <div className="space-y-1">
              <h4 className="font-medium">Cloud Hosting</h4>
              <p className="text-sm text-muted-foreground">Deploy your apps instantly</p>
              <p className="text-xs text-muted-foreground">hosting.com</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Contacts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-muted-foreground">Contacts</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
            </div>
            <span className="font-medium">Ahmed Khan</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
            </div>
            <span className="font-medium">Sarah Ali</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
            </div>
            <span className="font-medium">Mohammad Rahman</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
            <span className="font-medium text-muted-foreground">Nasir Sheikh</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>FH</AvatarFallback>
            </Avatar>
            <span className="font-medium text-muted-foreground">Fatima Hassan</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Group Conversations */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-muted-foreground">Group conversations</h3>
        
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Dev Team</span>
              <Badge variant="secondary" className="h-4 text-xs">3</Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">F</span>
          </div>
          <span className="font-medium">Family</span>
        </div>
      </div>
    </aside>
  );
}
