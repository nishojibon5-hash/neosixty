import { Image, Video, Smile, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { toast } from "sonner";

export function CreatePost() {
  const { state, addPost } = useApp();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isPosting, setIsPosting] = useState(false);
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

  const handlePost = async () => {
    if (!content.trim() && !selectedImage) {
      toast.error("Please write something or add an image");
      return;
    }

    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      addPost(content, selectedImage || undefined);
      setContent("");
      setSelectedImage("");
      setIsPosting(false);
      toast.success("Post shared successfully!");
    }, 1000);
  };

  const removeImage = () => {
    setSelectedImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={state.currentUser.avatar} />
            <AvatarFallback>{state.currentUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea 
              placeholder={`What's on your mind, ${state.currentUser.name.split(' ')[0]}?`}
              className="min-h-[60px] border-none bg-muted/50 resize-none p-3 text-lg"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {selectedImage && (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  Remove
                </Button>
              </div>
            )}
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-red-500 hover:bg-red-50"
                  onClick={() => toast.info("Live video feature coming soon!")}
                >
                  <Video className="h-5 w-5" />
                  <span className="hidden sm:inline">Live video</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-green-500 hover:bg-green-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-5 w-5" />
                  <span className="hidden sm:inline">Photo/video</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-yellow-500 hover:bg-yellow-50"
                  onClick={() => toast.info("Feeling/activity feature coming soon!")}
                >
                  <Smile className="h-5 w-5" />
                  <span className="hidden sm:inline">Feeling/activity</span>
                </Button>
              </div>
              
              <Button 
                className="px-8" 
                onClick={handlePost}
                disabled={isPosting || (!content.trim() && !selectedImage)}
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
