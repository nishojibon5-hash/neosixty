import { MessageCircle, Share, MoreHorizontal, Send, Edit, AtSign, Hash } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ShareDialog } from "./ShareDialog";
import { ReactionsBar, ReactionsDisplay } from "./ReactionsBar";
import { VerificationBadge } from "./VerificationBadge";
import { GreenBadge } from "./GreenBadge";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Post as PostType, ReactionType } from "@shared/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { addReaction, removeReaction, addComment, sharePost, state } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState<string>("");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  // Get current user's reaction
  const currentReaction = Object.entries(post.reactions).find(([_, reaction]) => 
    reaction.users.includes(state.currentUser.id)
  )?.[0] as ReactionType | undefined;

  const handleReaction = (reactionType: ReactionType) => {
    if (currentReaction === reactionType) {
      removeReaction(post.id, reactionType);
      toast.success("Reaction removed");
    } else {
      if (currentReaction) {
        removeReaction(post.id, currentReaction);
      }
      addReaction(post.id, reactionType);
      toast.success(`Reacted with ${reactionType}`);
    }
  };

  const handleComment = () => {
    if (commentText.trim() || commentImage) {
      addComment(post.id, commentText, commentImage || undefined);
      setCommentText("");
      setCommentImage("");
      toast.success("Comment added!");
    }
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const handleConfirmShare = () => {
    sharePost(post.id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  const handleImageComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCommentImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const totalReactions = Object.values(post.reactions).reduce((sum, reaction) => sum + reaction.count, 0);
  const totalComments = post.comments.length;

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
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{post.author.name}</h3>
                <VerificationBadge isVerified={post.author.isVerified} />
              </div>
              <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {post.author.id === state.currentUser.id && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Post Content */}
        {isEditing ? (
          <div className="space-y-2">
            <Textarea 
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => {
                // Here you would update the post content
                setIsEditing(false);
                toast.success("Post updated!");
              }}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => {
                setEditContent(post.content);
                setIsEditing(false);
              }}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {post.isHtml ? (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            ) : (
              <p className="text-base leading-relaxed">{post.content}</p>
            )}
          </div>
        )}

        {/* Mentions and Tags */}
        {(post.mentions || post.tags) && (
          <div className="flex flex-wrap gap-2">
            {post.mentions?.map((mention) => (
              <Badge key={mention} variant="secondary" className="flex items-center gap-1">
                <AtSign className="h-3 w-3" />
                {mention}
              </Badge>
            ))}
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Media */}
        {post.image && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-contain max-h-[500px]"
            />
          </div>
        )}

        {post.video && (
          <div className="rounded-lg overflow-hidden">
            <video 
              src={post.video} 
              controls
              className="w-full h-auto max-h-[500px]"
            />
          </div>
        )}
        
        {/* Reactions and Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <ReactionsDisplay reactions={post.reactions} />
          <div className="flex gap-4">
            <span 
              className="cursor-pointer hover:underline"
              onClick={() => setShowComments(!showComments)}
            >
              {totalComments} comments
            </span>
            <span>{post.shares} shares</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-around">
            <ReactionsBar
              onReact={handleReaction}
              currentReaction={currentReaction}
            />
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
                    <div className="flex items-center gap-1 mb-1">
                      <h4 className="font-medium text-sm">{comment.author.name}</h4>
                      <VerificationBadge isVerified={comment.author.isVerified} size="sm" />
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    {comment.image && (
                      <img 
                        src={comment.image} 
                        alt="Comment attachment" 
                        className="mt-2 max-w-xs rounded"
                      />
                    )}
                    {comment.video && (
                      <video 
                        src={comment.video} 
                        controls
                        className="mt-2 max-w-xs rounded"
                      />
                    )}
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
            <div className="space-y-2">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={state.currentUser.avatar} />
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
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleImageComment}
                    className="hidden"
                    id={`comment-file-${post.id}`}
                  />
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => document.getElementById(`comment-file-${post.id}`)?.click()}
                  >
                    📎
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleComment}
                    disabled={!commentText.trim() && !commentImage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {commentImage && (
                <div className="ml-11 relative inline-block">
                  <img 
                    src={commentImage} 
                    alt="Comment preview" 
                    className="max-w-xs rounded"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-1 right-1"
                    onClick={() => setCommentImage("")}
                  >
                    ×
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Share Dialog */}
        <ShareDialog
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          post={post}
          onShare={handleConfirmShare}
        />
      </CardContent>
    </Card>
  );
}
