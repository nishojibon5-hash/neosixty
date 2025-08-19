import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { ReactionType } from "@shared/types";

interface ReactionsBarProps {
  onReact: (reactionType: ReactionType) => void;
  currentReaction?: ReactionType;
  className?: string;
}

const reactionEmojis: Record<ReactionType, { emoji: string; label: string; color: string }> = {
  like: { emoji: "👍", label: "Like", color: "text-blue-600" },
  love: { emoji: "❤️", label: "Love", color: "text-red-600" },
  haha: { emoji: "😂", label: "Haha", color: "text-yellow-600" },
  wow: { emoji: "😮", label: "Wow", color: "text-orange-600" },
  angry: { emoji: "😡", label: "Angry", color: "text-red-700" },
  sad: { emoji: "😢", label: "Sad", color: "text-gray-600" }
};

export function ReactionsBar({ onReact, currentReaction, className }: ReactionsBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReactionClick = (reactionType: ReactionType) => {
    onReact(reactionType);
    setIsOpen(false);
  };

  const getCurrentReactionData = () => {
    if (currentReaction) {
      return reactionEmojis[currentReaction];
    }
    return { emoji: "👍", label: "Like", color: "text-muted-foreground" };
  };

  const currentReactionData = getCurrentReactionData();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "flex-1 flex items-center gap-2 transition-colors hover:bg-blue-50",
            currentReaction ? currentReactionData.color : "hover:text-blue-600",
            className
          )}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setTimeout(() => setIsOpen(false), 300)}
        >
          <span className="text-lg">{currentReactionData.emoji}</span>
          <span className="font-medium">{currentReactionData.label}</span>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-auto p-2" 
        align="start"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex gap-1">
          {Object.entries(reactionEmojis).map(([reactionType, data]) => (
            <Button
              key={reactionType}
              variant="ghost"
              size="sm"
              className={cn(
                "h-12 w-12 p-0 hover:scale-125 transition-transform",
                currentReaction === reactionType && "bg-muted"
              )}
              onClick={() => handleReactionClick(reactionType as ReactionType)}
              title={data.label}
            >
              <span className="text-2xl">{data.emoji}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface ReactionsDisplayProps {
  reactions: Record<ReactionType, { count: number; users: string[] }>;
  className?: string;
}

export function ReactionsDisplay({ reactions, className }: ReactionsDisplayProps) {
  const totalReactions = Object.values(reactions).reduce((sum, reaction) => sum + reaction.count, 0);
  
  if (totalReactions === 0) return null;

  const topReactions = Object.entries(reactions)
    .filter(([_, reaction]) => reaction.count > 0)
    .sort(([_, a], [__, b]) => b.count - a.count)
    .slice(0, 3);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex -space-x-1">
        {topReactions.map(([reactionType, _]) => (
          <div 
            key={reactionType}
            className="h-5 w-5 rounded-full bg-white border flex items-center justify-center text-xs"
          >
            {reactionEmojis[reactionType as ReactionType].emoji}
          </div>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {totalReactions}
      </span>
    </div>
  );
}
