import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Edit3 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { toast } from "sonner";

export function ProfileEditDialog() {
  const { state, updateUserProfile } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentProfile = state.currentUser.profile || {
    bio: "",
    work: [],
    education: [],
    socialLinks: {},
    interests: [],
    languages: []
  };

  const [profileData, setProfileData] = useState({
    name: state.currentUser.name,
    username: state.currentUser.username,
    bio: currentProfile.bio || "",
    location: currentProfile.location || "",
    website: currentProfile.website || "",
    phone: currentProfile.phoneNumber || "",
    email: currentProfile.email || "",
    birthday: currentProfile.birthday || "",
    relationshipStatus: currentProfile.relationshipStatus || "",
    interests: currentProfile.interests?.join(", ") || "",
    languages: currentProfile.languages?.join(", ") || ""
  });

  const handleSave = () => {
    const updatedProfile = {
      ...currentProfile,
      bio: profileData.bio,
      location: profileData.location,
      website: profileData.website,
      phoneNumber: profileData.phone,
      email: profileData.email,
      birthday: profileData.birthday,
      relationshipStatus: profileData.relationshipStatus as any,
      interests: profileData.interests ? profileData.interests.split(",").map(i => i.trim()) : [],
      languages: profileData.languages ? profileData.languages.split(",").map(l => l.trim()) : []
    };

    updateUserProfile(updatedProfile);
    setIsOpen(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-2">
          <Edit3 className="h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Write something about yourself..."
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, Country"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+88 01700 000000"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="www.yourwebsite.com"
                value={profileData.website}
                onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="birthday">Birthday</Label>
              <Input
                id="birthday"
                placeholder="January 15, 1998"
                value={profileData.birthday}
                onChange={(e) => setProfileData({ ...profileData, birthday: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="relationship">Relationship Status</Label>
              <Input
                id="relationship"
                placeholder="Single, Married, etc."
                value={profileData.relationshipStatus}
                onChange={(e) => setProfileData({ ...profileData, relationshipStatus: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="interests">Interests (comma separated)</Label>
              <Input
                id="interests"
                placeholder="Programming, Music, Sports"
                value={profileData.interests}
                onChange={(e) => setProfileData({ ...profileData, interests: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="languages">Languages (comma separated)</Label>
              <Input
                id="languages"
                placeholder="Bengali, English, Hindi"
                value={profileData.languages}
                onChange={(e) => setProfileData({ ...profileData, languages: e.target.value })}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
