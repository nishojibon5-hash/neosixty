import { Image, Video, Smile, MapPin, Code, Type, AtSign, Hash, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { toast } from "sonner";

export function CreatePost() {
  const { state, addPost } = useApp();
  const [content, setContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [isPosting, setIsPosting] = useState(false);
  const [mentions, setMentions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [showMentionInput, setShowMentionInput] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [mentionInput, setMentionInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setSelectedVideo(""); // Clear video if image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedVideo(e.target?.result as string);
        setSelectedImage(""); // Clear image if video is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const addMention = () => {
    if (mentionInput.trim() && !mentions.includes(mentionInput.trim())) {
      setMentions([...mentions, mentionInput.trim()]);
      setMentionInput("");
      setShowMentionInput(false);
      toast.success(`Mentioned @${mentionInput.trim()}`);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      setShowTagInput(false);
      toast.success(`Added #${tagInput.trim()}`);
    }
  };

  const removeMention = (mention: string) => {
    setMentions(mentions.filter(m => m !== mention));
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePost = async () => {
    const postContent = isHtmlMode ? htmlContent : content;
    
    if (!postContent.trim() && !selectedImage && !selectedVideo) {
      toast.error("Please write something or add media");
      return;
    }

    setIsPosting(true);
    
    setTimeout(() => {
      addPost(
        postContent, 
        isHtmlMode, 
        selectedImage || undefined, 
        selectedVideo || undefined,
        mentions.length > 0 ? mentions : undefined,
        tags.length > 0 ? tags : undefined
      );
      setContent("");
      setHtmlContent("");
      setSelectedImage("");
      setSelectedVideo("");
      setMentions([]);
      setTags([]);
      setIsPosting(false);
      toast.success("Post shared successfully!");
    }, 1000);
  };

  const removeMedia = () => {
    setSelectedImage("");
    setSelectedVideo("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
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
            {/* Post Type Tabs */}
            <Tabs value={isHtmlMode ? "html" : "text"} onValueChange={(value) => setIsHtmlMode(value === "html")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Text Post
                </TabsTrigger>
                <TabsTrigger value="html" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  HTML Post
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="text">
                <Textarea 
                  placeholder={`What's on your mind, ${state.currentUser.name.split(' ')[0]}?`}
                  className="min-h-[80px] border-none bg-muted/50 resize-none p-3 text-base"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </TabsContent>
              
              <TabsContent value="html">
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Enter your HTML code here..."
                    className="min-h-[120px] border-none bg-muted/50 resize-none p-3 text-sm font-mono"
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                  />
                  {htmlContent && (
                    <div className="border rounded-lg p-3 bg-background">
                      <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Mentions and Tags */}
            {(mentions.length > 0 || tags.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {mentions.map((mention) => (
                  <Badge key={mention} variant="secondary" className="flex items-center gap-1">
                    <AtSign className="h-3 w-3" />
                    {mention}
                    <button onClick={() => removeMention(mention)} className="ml-1 hover:text-destructive">×</button>
                  </Badge>
                ))}
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">×</button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Mention Input */}
            {showMentionInput && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter username to mention"
                  value={mentionInput}
                  onChange={(e) => setMentionInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addMention()}
                  className="flex-1"
                />
                <Button size="sm" onClick={addMention}>Add</Button>
                <Button size="sm" variant="outline" onClick={() => setShowMentionInput(false)}>Cancel</Button>
              </div>
            )}

            {/* Tag Input */}
            {showTagInput && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter hashtag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1"
                />
                <Button size="sm" onClick={addTag}>Add</Button>
                <Button size="sm" variant="outline" onClick={() => setShowTagInput(false)}>Cancel</Button>
              </div>
            )}
            
            {/* Media Preview */}
            {(selectedImage || selectedVideo) && (
              <div className="relative">
                {selectedImage && (
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                )}
                {selectedVideo && (
                  <video 
                    src={selectedVideo} 
                    controls
                    className="w-full max-h-96 rounded-lg"
                  />
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeMedia}
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
            
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoSelect}
              accept="video/*"
              className="hidden"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-green-500 hover:bg-green-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Photo</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-red-500 hover:bg-red-50"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Video className="h-4 w-4" />
                  <span className="hidden sm:inline">Video</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-blue-500 hover:bg-blue-50"
                  onClick={() => setShowMentionInput(true)}
                >
                  <AtSign className="h-4 w-4" />
                  <span className="hidden sm:inline">Mention</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-purple-500 hover:bg-purple-50"
                  onClick={() => setShowTagInput(true)}
                >
                  <Hash className="h-4 w-4" />
                  <span className="hidden sm:inline">Tag</span>
                </Button>
              </div>
              
              <Button 
                className="px-8" 
                onClick={handlePost}
                disabled={isPosting || ((!content.trim() && !htmlContent.trim()) && !selectedImage && !selectedVideo)}
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
