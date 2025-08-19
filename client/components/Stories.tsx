import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const stories = [
  { id: 1, name: "Your Story", avatar: "/placeholder.svg", isOwn: true },
  { id: 2, name: "Ahmed Khan", avatar: "/placeholder.svg", hasStory: true },
  { id: 3, name: "Sarah Ali", avatar: "/placeholder.svg", hasStory: true },
  { id: 4, name: "Mohammad Rahman", avatar: "/placeholder.svg", hasStory: true },
  { id: 5, name: "Fatima Hassan", avatar: "/placeholder.svg", hasStory: true },
];

export function Stories() {
  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0">
              {story.isOwn ? (
                <div className="relative cursor-pointer group">
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                    <img 
                      src="/placeholder.svg" 
                      alt="Your story background"
                      className="w-full h-2/3 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-white flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-1">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 font-medium">Create Story</p>
                </div>
              ) : (
                <div className="relative cursor-pointer group">
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-1">
                    <div className="w-full h-full rounded-lg overflow-hidden relative">
                      <img 
                        src="/placeholder.svg" 
                        alt={`${story.name}'s story`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-0.5">
                          <Avatar className="w-full h-full">
                            <AvatarImage src={story.avatar} />
                            <AvatarFallback className="text-xs">{story.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 font-medium truncate">{story.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
