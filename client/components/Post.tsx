import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { ShareDialog } from "./ShareDialog";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Post as PostType } from "@shared/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { toggleLike, addComment, sharePost } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    toggleLike(post.id);
    
    // Add a small delay for visual feedback
    setTimeout(() => {
      setIsLiking(false);
    }, 300);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText("");
      toast.success("Comment added!");
    }
  };

  const handleShare = () => {
    sharePost(post.id);
    toast.success("Post shared!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-base leading-relaxed">{post.content}</p>
        
        {post.image && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mr-1">
                <ThumbsUp className="h-3 w-3 text-white" />
              </div>
              <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center -ml-1">
                <Heart className="h-3 w-3 text-white" />
              </div>
            </div>
            <span>{post.likes}</span>
          </div>
          <div className="flex gap-4">
            <span 
              className="cursor-pointer hover:underline"
              onClick={() => setShowComments(!showComments)}
            >
              {post.comments.length} comments
            </span>
            <span>{post.shares} shares</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-around">
            <Button 
              variant="ghost" 
              className={cn(
                "flex-1 flex items-center gap-2 transition-colors",
                post.isLiked 
                  ? "text-blue-600 hover:bg-blue-50" 
                  : "hover:bg-blue-50 hover:text-blue-600"
              )}
              onClick={handleLike}
              disabled={isLiking}
            >
              <ThumbsUp className={cn("h-5 w-5", post.isLiked && "fill-current")} />
              <span>{post.isLiked ? 'Liked' : 'Like'}</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-1 flex items-center gap-2 hover:bg-green-50 hover:text-green-600"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-1 flex items-center gap-2 hover:bg-purple-50 hover:text-purple-600"
              onClick={handleShare}
            >
              <Share className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3 pt-3 border-t">
            {/* Existing Comments */}
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback className="text-xs">{comment.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="font-medium text-sm">{comment.author.name}</h4>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <button className="hover:underline">Like</button>
                    <button className="hover:underline">Reply</button>
                    <span>{comment.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add Comment */}
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  size="sm"
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
