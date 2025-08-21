import { Search, MoreHorizontal, Video, Phone, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { UserProfile, FriendRequestCard } from "./UserProfile";
import { useApp } from "../context/AppContext";

const friendSuggestions = [
  {
    id: 'user1',
    name: 'Rahman Ahmed',
    avatar: '/placeholder.svg',
    username: 'rahman.ahmed',
    followerCount: 1200,
    followingCount: 890,
    isVerified: true
  },
  {
    id: 'user2',
    name: 'Fatima Khan',
    avatar: '/placeholder.svg',
    username: 'fatima.khan',
    followerCount: 650,
    followingCount: 420,
    isVerified: false
  },
  {
    id: 'user3',
    name: 'Hassan Ali',
    avatar: '/placeholder.svg',
    username: 'hassan.ali',
    followerCount: 2800,
    followingCount: 150,
    isVerified: true
  }
];

const friendRequests = [
  {
    id: 'req1',
    from: {
      id: 'user4',
      name: 'Ayesha Rahman',
      avatar: '/placeholder.svg',
      username: 'ayesha.r',
      followerCount: 450,
      followingCount: 320,
      isVerified: false,
      role: 'user' as const,
      createdAt: new Date().toISOString(),
      isActive: true
    },
    timeAgo: '2 hours ago'
  }
];

export function RightSidebar() {
  const { acceptFriendRequest } = useApp();

  const handleAcceptRequest = async (requestId: string) => {
    await acceptFriendRequest(requestId);
  };

  const handleDeclineRequest = async (requestId: string) => {
    // Handle decline
  };

  return (
    <aside className="hidden xl:block w-80 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-4">
      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-muted-foreground">Friend Requests</h3>
          {friendRequests.map((request) => (
            <FriendRequestCard
              key={request.id}
              request={request}
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
            />
          ))}
        </div>
      )}

      {friendRequests.length > 0 && <Separator />}

      {/* People You May Know */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-muted-foreground">People you may know</h3>
        {friendSuggestions.slice(0, 2).map((user) => (
          <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-medium">{user.name}</h4>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
            <Button size="sm" className="flex items-center gap-1">
              <UserPlus className="h-3 w-3" />
              Add
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      {/* Sponsored */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-muted-foreground">Sponsored</h3>
        
        <div className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
          <div className="flex gap-3">
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0"></div>
            <div className="space-y-1">
              <h4 className="font-medium">New Tech Course</h4>
              <p className="text-xs text-muted-foreground">Learn React & Next.js from scratch</p>
              <p className="text-xs text-muted-foreground">example.com</p>
            </div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
          <div className="flex gap-3">
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex-shrink-0"></div>
            <div className="space-y-1">
              <h4 className="font-medium">Cloud Hosting</h4>
              <p className="text-xs text-muted-foreground">Deploy your apps instantly</p>
              <p className="text-xs text-muted-foreground">hosting.com</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Contacts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-muted-foreground">Contacts</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
            </div>
            <span className="font-medium">Ahmed Khan</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
            </div>
            <span className="font-medium">Sarah Ali</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
            </div>
            <span className="font-medium">Mohammad Rahman</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
            <span className="font-medium text-muted-foreground">Nasir Sheikh</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>FH</AvatarFallback>
            </Avatar>
            <span className="font-medium text-muted-foreground">Fatima Hassan</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Group Conversations */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-muted-foreground">Group conversations</h3>
        
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Dev Team</span>
              <Badge variant="secondary" className="h-4 text-xs">3</Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">F</span>
          </div>
          <span className="font-medium">Family</span>
        </div>
      </div>
    </aside>
  );
}
