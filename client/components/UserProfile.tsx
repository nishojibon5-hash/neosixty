import { UserPlus, UserCheck, UserMinus, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { useState } from "react";
import { User } from "@shared/types";
import { useApp } from "../context/AppContext";
import { toast } from "sonner";

interface UserProfileProps {
  user: User;
  relationship?: 'friend' | 'following' | 'follower' | 'pending' | 'none';
  className?: string;
}

export function UserProfile({ user, relationship = 'none', className }: UserProfileProps) {
  const { sendFriendRequest, followUser, unfollowUser, state } = useApp();
  const [currentRelationship, setCurrentRelationship] = useState(relationship);
  const [isLoading, setIsLoading] = useState(false);

  const handleFriendRequest = async () => {
    setIsLoading(true);
    try {
      await sendFriendRequest(user.id);
      setCurrentRelationship('pending');
      toast.success(`Friend request sent to ${user.name}`);
    } catch (error) {
      toast.error("Failed to send friend request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      if (currentRelationship === 'following') {
        await unfollowUser(user.id);
        setCurrentRelationship('none');
        toast.success(`Unfollowed ${user.name}`);
      } else {
        await followUser(user.id);
        setCurrentRelationship('following');
        toast.success(`Following ${user.name}`);
      }
    } catch (error) {
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  const getActionButton = () => {
    switch (currentRelationship) {
      case 'friend':
        return (
          <Button variant="outline" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Friends
          </Button>
        );
      case 'following':
        return (
          <Button 
            variant="outline" 
            onClick={handleFollow}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <UserCheck className="h-4 w-4" />
            Following
          </Button>
        );
      case 'pending':
        return (
          <Button variant="outline" disabled className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Request Sent
          </Button>
        );
      default:
        return (
          <div className="flex gap-2">
            <Button 
              onClick={handleFriendRequest}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Add Friend
            </Button>
            <Button 
              variant="outline"
              onClick={handleFollow}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Follow
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              {currentRelationship !== 'none' && (
                <Badge variant="secondary" className="mt-1">
                  {currentRelationship === 'friend' && 'Friend'}
                  {currentRelationship === 'following' && 'Following'}
                  {currentRelationship === 'follower' && 'Follows you'}
                  {currentRelationship === 'pending' && 'Request pending'}
                </Badge>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem>
                View Profile
              </DropdownMenuItem>
              {currentRelationship === 'friend' && (
                <DropdownMenuItem className="text-destructive">
                  <UserMinus className="h-4 w-4 mr-2" />
                  Unfriend
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center">
          {getActionButton()}
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface FriendRequestCardProps {
  request: {
    id: string;
    from: User;
    timeAgo: string;
  };
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
  className?: string;
}

export function FriendRequestCard({ request, onAccept, onDecline, className }: FriendRequestCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await onAccept(request.id);
      toast.success(`Accepted friend request from ${request.from.name}`);
    } catch (error) {
      toast.error("Failed to accept friend request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    setIsLoading(true);
    try {
      await onDecline(request.id);
      toast.success("Friend request declined");
    } catch (error) {
      toast.error("Failed to decline friend request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={request.from.avatar} />
            <AvatarFallback>{request.from.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium">{request.from.name}</h4>
            <p className="text-sm text-muted-foreground">{request.timeAgo}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm"
              onClick={handleAccept}
              disabled={isLoading}
            >
              Accept
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={handleDecline}
              disabled={isLoading}
            >
              Decline
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
