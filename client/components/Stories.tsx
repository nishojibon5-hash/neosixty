import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useRef } from "react";
import { useApp } from "../context/AppContext";

export function Stories() {
  const { state, addStory } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateStory = () => {
    if (selectedImage) {
      addStory(selectedImage);
      setSelectedImage("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {/* Create Story */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="flex-shrink-0 cursor-pointer group">
                <div className="w-24 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative hover:shadow-lg transition-shadow">
                  <img 
                    src={state.currentUser.avatar} 
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
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Story</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center">
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Story preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">No image selected</p>
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select Image
                  </Button>
                  <Button 
                    onClick={handleCreateStory}
                    disabled={!selectedImage}
                    className="flex-1"
                  >
                    Share Story
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Existing Stories */}
          {state.stories.map((story) => (
            <div key={story.id} className="flex-shrink-0">
              <div className="relative cursor-pointer group">
                <div className="w-24 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-1 hover:shadow-lg transition-shadow">
                  <div className="w-full h-full rounded-lg overflow-hidden relative">
                    <img 
                      src={story.image} 
                      alt={`${story.author.name}'s story`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-0.5">
                        <Avatar className="w-full h-full">
                          <AvatarImage src={story.author.avatar} />
                          <AvatarFallback className="text-xs">{story.author.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center mt-1 font-medium truncate">{story.author.name}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
