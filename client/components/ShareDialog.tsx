import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Copy, MessageCircle, Send, Link } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Post } from "@shared/types";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onShare: () => void;
}

export function ShareDialog({ isOpen, onClose, post, onShare }: ShareDialogProps) {
  const [shareText, setShareText] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    // Simulate sharing delay
    setTimeout(() => {
      onShare();
      setShareText("");
      setIsSharing(false);
      onClose();
      toast.success("Post shared successfully!");
    }, 1000);
  };

  const copyLink = () => {
    const link = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const shareToMessenger = () => {
    toast.info("Sharing to Messenger...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Share Options */}
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex flex-col gap-2 h-auto p-4"
              onClick={handleShare}
            >
              <Send className="h-6 w-6" />
              <span className="text-xs">Share Now</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col gap-2 h-auto p-4"
              onClick={shareToMessenger}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-xs">Send in Messenger</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col gap-2 h-auto p-4"
              onClick={copyLink}
            >
              <Copy className="h-6 w-6" />
              <span className="text-xs">Copy link</span>
            </Button>
          </div>

          {/* Write something about this */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <span className="font-medium">Md Salman</span>
            </div>
            
            <Textarea
              placeholder="Say something about this..."
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Original Post Preview */}
          <div className="border rounded-lg p-3 bg-muted/50">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="text-xs">{post.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
              </div>
            </div>
            <p className="text-sm mb-2">{post.content}</p>
            {post.image && (
              <img 
                src={post.image} 
                alt="Post preview" 
                className="w-full h-32 object-cover rounded"
              />
            )}
          </div>

          {/* Share Button */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleShare} disabled={isSharing}>
              {isSharing ? "Sharing..." : "Share"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
