import { 
  Users, 
  Bookmark, 
  Clock, 
  Calendar, 
  MessageCircle, 
  Store, 
  Video, 
  ChevronDown,
  Flag,
  Shield,
  Zap,
  Gamepad2,
  Heart,
  MapPin,
  Briefcase,
  Music,
  Camera,
  TrendingUp,
  Globe,
  Star
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { GreenBadge } from "./GreenBadge";
import { useState } from "react";
import { toast } from "sonner";

export function Sidebar() {
  const { state } = useApp();
  const [showMore, setShowMore] = useState(false);

  const handleFeatureClick = (featureName: string) => {
    toast.info(`${featureName} feature coming soon!`);
  };

  const mainMenuItems = [
    {
      icon: Users,
      label: "Friends",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      action: () => handleFeatureClick("Friends"),
      badge: "12"
    },
    {
      icon: Clock,
      label: "Memories",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      action: () => handleFeatureClick("Memories")
    },
    {
      icon: Bookmark,
      label: "Saved",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      action: () => handleFeatureClick("Saved"),
      badge: "3"
    },
    {
      icon: Users,
      label: "Groups",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      action: () => handleFeatureClick("Groups"),
      badge: "5"
    },
    {
      icon: Video,
      label: "Video",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      action: () => handleFeatureClick("Video")
    },
    {
      icon: Store,
      label: "Marketplace",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      action: () => handleFeatureClick("Marketplace")
    },
    {
      icon: Calendar,
      label: "Events",
      color: "text-red-500",
      bgColor: "bg-red-100",
      action: () => handleFeatureClick("Events"),
      badge: "2"
    }
  ];

  const moreMenuItems = [
    {
      icon: Flag,
      label: "Pages",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      action: () => handleFeatureClick("Pages")
    },
    {
      icon: Shield,
      label: "Ad Center",
      color: "text-green-500",
      bgColor: "bg-green-100",
      action: () => handleFeatureClick("Ad Center")
    },
    {
      icon: Zap,
      label: "Ads Manager",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      action: () => handleFeatureClick("Ads Manager")
    },
    {
      icon: Gamepad2,
      label: "Gaming",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      action: () => handleFeatureClick("Gaming")
    },
    {
      icon: Heart,
      label: "Fundraisers",
      color: "text-pink-500",
      bgColor: "bg-pink-100",
      action: () => handleFeatureClick("Fundraisers")
    },
    {
      icon: MapPin,
      label: "Check-ins",
      color: "text-red-500",
      bgColor: "bg-red-100",
      action: () => handleFeatureClick("Check-ins")
    },
    {
      icon: Briefcase,
      label: "Jobs",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      action: () => handleFeatureClick("Jobs")
    },
    {
      icon: Music,
      label: "Music",
      color: "text-green-500",
      bgColor: "bg-green-100",
      action: () => handleFeatureClick("Music")
    },
    {
      icon: Camera,
      label: "Recent ad activity",
      color: "text-gray-500",
      bgColor: "bg-gray-100",
      action: () => handleFeatureClick("Recent ad activity")
    }
  ];

  return (
    <aside className="hidden lg:block w-80 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-2">
      {/* User Profile */}
      <Link to="/profile">
        <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/50">
          <Avatar className="h-9 w-9">
            <AvatarImage src={state.currentUser.avatar} />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex items-center gap-2">
            <span className="font-medium">{state.currentUser.name}</span>
            <GreenBadge followerCount={state.currentUser.followerCount} size="sm" />
          </div>
        </Button>
      </Link>

      {/* Main Menu Items */}
      <div className="space-y-1">
        {mainMenuItems.map((item, index) => (
          <Button 
            key={index}
            variant="ghost" 
            className="w-full justify-start h-auto p-3 hover:bg-muted/50"
            onClick={item.action}
          >
            <div className={`h-8 w-8 rounded-lg ${item.bgColor} flex items-center justify-center`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <span className="ml-3 flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* See More / See Less */}
      <Button 
        variant="ghost" 
        className="w-full justify-start h-auto p-3 hover:bg-muted/50"
        onClick={() => setShowMore(!showMore)}
      >
        <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${showMore ? 'rotate-180' : ''}`} />
        </div>
        <span className="ml-3">{showMore ? 'See less' : 'See more'}</span>
      </Button>

      {/* More Menu Items */}
      {showMore && (
        <div className="space-y-1 animate-in slide-in-from-top-2">
          {moreMenuItems.map((item, index) => (
            <Button 
              key={index}
              variant="ghost" 
              className="w-full justify-start h-auto p-3 hover:bg-muted/50"
              onClick={item.action}
            >
              <div className={`h-8 w-8 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <span className="ml-3">{item.label}</span>
            </Button>
          ))}
        </div>
      )}

      <Separator className="my-4" />

      {/* Your Shortcuts */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-muted-foreground px-3">Your shortcuts</h3>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start h-auto p-3 hover:bg-muted/50"
          onClick={() => handleFeatureClick("React Developers Group")}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">R</span>
          </div>
          <div className="ml-3 flex-1">
            <span className="text-sm font-medium">React Developers</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">15 online</span>
            </div>
          </div>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start h-auto p-3 hover:bg-muted/50"
          onClick={() => handleFeatureClick("Web Developers Group")}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">W</span>
          </div>
          <div className="ml-3 flex-1">
            <span className="text-sm font-medium">Web Developers</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">8 online</span>
            </div>
          </div>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start h-auto p-3 hover:bg-muted/50"
          onClick={() => handleFeatureClick("Tech News Group")}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <div className="ml-3 flex-1">
            <span className="text-sm font-medium">Tech News</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">3 new posts</span>
            </div>
          </div>
        </Button>

        <Button 
          variant="ghost" 
          className="w-full justify-start h-auto p-3 hover:bg-muted/50"
          onClick={() => handleFeatureClick("Builder.io Team")}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <div className="ml-3 flex-1">
            <span className="text-sm font-medium">Builder.io Team</span>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-muted-foreground">Active now</span>
            </div>
          </div>
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Quick Actions */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-muted-foreground px-3">Quick Actions</h3>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start h-auto p-3 hover:bg-muted/50"
          onClick={() => handleFeatureClick("Create Page")}
        >
          <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Flag className="h-5 w-5 text-green-600" />
          </div>
          <span className="ml-3 text-sm">Create Page</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start h-auto p-3 hover:bg-muted/50"
          onClick={() => handleFeatureClick("Create Ad")}
        >
          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <span className="ml-3 text-sm">Create Ad</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start h-auto p-3 hover:bg-muted/50"
          onClick={() => handleFeatureClick("Create Group")}
        >
          <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <span className="ml-3 text-sm">Create Group</span>
        </Button>
      </div>
    </aside>
  );
}
