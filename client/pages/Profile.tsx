import { useState, useRef } from "react";
import { Camera, Edit3, MapPin, Briefcase, GraduationCap, Heart, Globe, Phone, Mail, Calendar, Plus, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useApp } from "../context/AppContext";
import { Post } from "../components/Post";
import { CreatePost } from "../components/CreatePost";
import { toast } from "sonner";

export default function Profile() {
  const { state } = useApp();
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(state.currentUser.profile?.coverPhoto || "");
  const [profilePicture, setProfilePicture] = useState(state.currentUser.avatar);
  const [bio, setBio] = useState(state.currentUser.profile?.bio || "");
  const [tempBio, setTempBio] = useState(bio);
  
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target?.result as string);
        setIsEditingCover(false);
        toast.success("Cover photo updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
        setIsEditingProfile(false);
        toast.success("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const saveBio = () => {
    setBio(tempBio);
    setIsEditingBio(false);
    toast.success("Bio updated!");
  };

  const userPosts = state.posts.filter(post => post.author.id === state.currentUser.id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover Photo Section */}
      <div className="relative">
        <div 
          className="h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg overflow-hidden relative group cursor-pointer"
          style={coverPhoto ? { backgroundImage: `url(${coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          onClick={() => setIsEditingCover(true)}
        >
          {!coverPhoto && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="h-12 w-12 mx-auto mb-2 opacity-70" />
                <p className="text-lg font-medium">Add Cover Photo</p>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              {coverPhoto ? 'Change Cover Photo' : 'Add Cover Photo'}
            </Button>
          </div>
        </div>

        <input
          type="file"
          ref={coverInputRef}
          onChange={handleCoverPhotoChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Profile Info Section */}
      <div className="relative -mt-20 px-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Profile Picture */}
          <div className="relative group cursor-pointer" onClick={() => setIsEditingProfile(true)}>
            <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
              <AvatarImage src={profilePicture} />
              <AvatarFallback className="text-4xl">{state.currentUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>

          <input
            type="file"
            ref={profileInputRef}
            onChange={handleProfilePictureChange}
            accept="image/*"
            className="hidden"
          />

          {/* Basic Info */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">{state.currentUser.name}</h1>
                <p className="text-muted-foreground">@{state.currentUser.username}</p>
                <p className="text-sm text-muted-foreground mt-1">1.2K friends • 890 followers</p>
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            {/* Bio Section */}
            <div className="mb-4">
              {isEditingBio ? (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Write something about yourself..."
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveBio}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setTempBio(bio);
                      setIsEditingBio(false);
                    }}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                  onClick={() => setIsEditingBio(true)}
                >
                  {bio ? (
                    <p className="text-sm">{bio}</p>
                  ) : (
                    <p className="text-muted-foreground text-sm">Add bio...</p>
                  )}
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>Software Developer at Builder.io</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span>University of Dhaka</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Single</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="mt-8 px-6">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - About Summary */}
              <div className="space-y-4">
                <IntroCard />
                <PhotosCard />
                <FriendsCard />
              </div>

              {/* Right Column - Posts */}
              <div className="lg:col-span-2 space-y-6">
                <CreatePost />
                {userPosts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
                {userPosts.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No posts yet</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <AboutSection />
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <PhotosSection />
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <VideosSection />
          </TabsContent>

          <TabsContent value="friends" className="mt-6">
            <FriendsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// About Summary Card Component
function IntroCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Intro
          <Button size="sm" variant="outline">Edit</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="h-4 w-4" />
          <span>Software Developer at <strong>Builder.io</strong></span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <GraduationCap className="h-4 w-4" />
          <span>Studied at <strong>University of Dhaka</strong></span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>Lives in <strong>Dhaka, Bangladesh</strong></span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Heart className="h-4 w-4" />
          <span><strong>Single</strong></span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>Joined <strong>January 2020</strong></span>
        </div>
      </CardContent>
    </Card>
  );
}

// Photos Summary Card
function PhotosCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Photos
          <Button size="sm" variant="outline">See all</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-muted rounded-md"></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Friends Summary Card  
function FriendsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Friends
          <Button size="sm" variant="outline">See all</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">1,234 friends</p>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="text-center">
              <Avatar className="h-16 w-16 mx-auto mb-1">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>F{i}</AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium">Friend {i}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// About Section Component
function AboutSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WorkEducationSection />
      <ContactBasicInfoSection />
    </div>
  );
}

function WorkEducationSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Work
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Briefcase className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Software Developer</p>
              <p className="text-sm text-muted-foreground">Builder.io • 2023 - Present</p>
              <p className="text-sm text-muted-foreground">Dhaka, Bangladesh</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Education
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <GraduationCap className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">University of Dhaka</p>
              <p className="text-sm text-muted-foreground">Bachelor's degree, Computer Science</p>
              <p className="text-sm text-muted-foreground">2018 - 2022</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ContactBasicInfoSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Contact Info
            <Button size="sm" variant="outline">Edit</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4" />
            <span className="text-sm">salman@example.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4" />
            <span className="text-sm">+88 01700 000000</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="h-4 w-4" />
            <span className="text-sm">www.mdsalman.dev</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Basic Info
            <Button size="sm" variant="outline">Edit</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Birthday</span>
            <span className="text-sm">January 15, 1998</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Gender</span>
            <span className="text-sm">Male</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Languages</span>
            <span className="text-sm">Bengali, English, Hindi</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PhotosSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {[...Array(24)].map((_, i) => (
        <div key={i} className="aspect-square bg-muted rounded-lg"></div>
      ))}
    </div>
  );
}

function VideosSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="aspect-video bg-muted rounded-lg"></div>
      ))}
    </div>
  );
}

function FriendsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {[...Array(24)].map((_, i) => (
        <Card key={i} className="text-center p-4">
          <Avatar className="h-20 w-20 mx-auto mb-2">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>F{i}</AvatarFallback>
          </Avatar>
          <p className="font-medium">Friend {i + 1}</p>
          <p className="text-sm text-muted-foreground">12 mutual friends</p>
          <Button size="sm" className="mt-2 w-full">Message</Button>
        </Card>
      ))}
    </div>
  );
}
