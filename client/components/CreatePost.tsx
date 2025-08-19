import { Image, Video, Smile, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";

export function CreatePost() {
  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea 
              placeholder="What's on your mind, Md Salman?"
              className="min-h-[60px] border-none bg-muted/50 resize-none p-3 text-lg"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-red-500 hover:bg-red-50">
                  <Video className="h-5 w-5" />
                  <span className="hidden sm:inline">Live video</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-green-500 hover:bg-green-50">
                  <Image className="h-5 w-5" />
                  <span className="hidden sm:inline">Photo/video</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-yellow-500 hover:bg-yellow-50">
                  <Smile className="h-5 w-5" />
                  <span className="hidden sm:inline">Feeling/activity</span>
                </Button>
              </div>
              
              <Button className="px-8">Post</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
