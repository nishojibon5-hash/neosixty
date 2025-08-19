import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface PostProps {
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image?: string;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
}

export function Post({ author, content, image, timeAgo, likes, comments, shares }: PostProps) {
  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{author.name}</h3>
              <p className="text-sm text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-base leading-relaxed">{content}</p>
        
        {image && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={image} 
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
            <span>{likes}</span>
          </div>
          <div className="flex gap-4">
            <span>{comments} comments</span>
            <span>{shares} shares</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-around">
            <Button variant="ghost" className="flex-1 flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600">
              <ThumbsUp className="h-5 w-5" />
              <span>Like</span>
            </Button>
            <Button variant="ghost" className="flex-1 flex items-center gap-2 hover:bg-green-50 hover:text-green-600">
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </Button>
            <Button variant="ghost" className="flex-1 flex items-center gap-2 hover:bg-purple-50 hover:text-purple-600">
              <Share className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
