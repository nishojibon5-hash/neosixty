import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Users,
  Settings,
  Shield,
  BarChart3,
  MessageSquare,
  Heart,
  Share2,
  Eye,
  UserPlus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Crown,
  UserCheck,
  UserX,
} from "lucide-react";
import { User, UserRole, RegisterData } from "@shared/types";

export default function AdminDashboard() {
  const {
    authState,
    adminSettings,
    updateAdminSettings,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
  } = useAuth();
  const { state, deletePost, deleteComment } = useApp();
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [newUser, setNewUser] = useState<RegisterData & { role: UserRole }>({
    name: "",
    phoneOrEmail: "",
    password: "",
    role: "user",
  });

  const users = getAllUsers();
  const activeUsers = users.filter((u) => u.isActive);
  const inactiveUsers = users.filter((u) => !u.isActive);

  const stats = {
    totalUsers: users.length,
    activeUsers: activeUsers.length,
    admins: users.filter((u) => u.role === "admin").length,
    moderators: users.filter((u) => u.role === "moderator").length,
    editors: users.filter((u) => u.role === "editor").length,
    totalPosts: state.posts.length,
    totalComments: state.posts.reduce(
      (acc, post) => acc + post.comments.length,
      0,
    ),
    totalReactions: state.posts.reduce(
      (acc, post) =>
        acc +
        Object.values(post.reactions).reduce(
          (sum, reaction) => sum + reaction.count,
          0,
        ),
      0,
    ),
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.phoneOrEmail || !newUser.password) {
      return;
    }

    const success = await createUser(newUser);
    if (success) {
      setNewUser({ name: "", phoneOrEmail: "", password: "", role: "user" });
      setIsCreateUserOpen(false);
    }
  };

  const handleDeletePost = (postId: string) => {
    if (confirm("এই পোস্টটি ডিলিট করতে চান?")) {
      deletePost(postId);
    }
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    if (confirm("এই কমেন্টটি ডিলিট করতে চান?")) {
      deleteComment(postId, commentId);
    }
  };

  const roleColors = {
    admin: "bg-red-100 text-red-800",
    moderator: "bg-orange-100 text-orange-800",
    editor: "bg-blue-100 text-blue-800",
    user: "bg-gray-100 text-gray-800",
  };

  const roleBangla = {
    admin: "এডমিন",
    moderator: "মডারেটর",
    editor: "এডিটর",
    user: "ইউজার",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                এডমিন ড্যাশবোর্ড
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-red-600 border-red-600">
                <Crown className="h-4 w-4 mr-1" />
                {authState.user?.name}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">মোট ইউজার</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeUsers} সক্রিয়,{" "}
                {stats.totalUsers - stats.activeUsers} নিষ্ক্রিয়
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">মোট পোস্ট</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalComments} কমেন্ট
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                মোট রিয়াকশন
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReactions}</div>
              <p className="text-xs text-muted-foreground">সকল পোস্টে</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">এডমিন টিম</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.admins + stats.moderators + stats.editors}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.admins} এডমিন, {stats.moderators} মডারেটর,{" "}
                {stats.editors} এডিটর
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">ইউজার ম্যানেজমেন্ট</TabsTrigger>
            <TabsTrigger value="content">কন্টেন্ট ম্যানেজমেন্ট</TabsTrigger>
            <TabsTrigger value="settings">অ্যাপ সেটিংস</TabsTrigger>
            <TabsTrigger value="analytics">অ্যানালিটিক্স</TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">ইউজার ম্যানেজমেন্ট</h2>
              <Dialog
                open={isCreateUserOpen}
                onOpenChange={setIsCreateUserOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    নতুন ইউজার
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>নতুন ইউজার তৈরি করুন</DialogTitle>
                    <DialogDescription>
                      নতুন ইউজার, এডিটর, মডারেটর বা এডমিন তৈরি করুন
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newUserName">নাম</Label>
                      <Input
                        id="newUserName"
                        value={newUser.name}
                        onChange={(e) =>
                          setNewUser((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="ইউজারের নাম"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newUserContact">ফোন/ইমেইল</Label>
                      <Input
                        id="newUserContact"
                        value={newUser.phoneOrEmail}
                        onChange={(e) =>
                          setNewUser((prev) => ({
                            ...prev,
                            phoneOrEmail: e.target.value,
                          }))
                        }
                        placeholder="01XXXXXXXXX অথবা email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newUserPassword">পাসওয়ার্ড</Label>
                      <Input
                        id="newUserPassword"
                        type="password"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        placeholder="পাসওয়ার্ড"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newUserRole">ভূমিকা</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value: UserRole) =>
                          setNewUser((prev) => ({ ...prev, role: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">ইউজার</SelectItem>
                          <SelectItem value="editor">এডিটর</SelectItem>
                          <SelectItem value="moderator">মডারেটর</SelectItem>
                          <SelectItem value="admin">এডমিন</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleCreateUser} className="w-full">
                      তৈরি করুন
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>সকল ইউজার</CardTitle>
                <CardDescription>সিস্টেমের সকল ইউজারের তালিকা</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{user.name}</h3>
                            <Badge className={roleColors[user.role]}>
                              {roleBangla[user.role]}
                            </Badge>
                            {!user.isActive && (
                              <Badge variant="destructive">নিষ্ক্রিয়</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {user.phoneNumber || user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                          disabled={user.id === authState.user?.id}
                        >
                          {user.isActive ? (
                            <>
                              <UserX className="h-4 w-4 mr-1" />
                              নিষ্ক্রিয়
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4 mr-1" />
                              সক্রিয়
                            </>
                          )}
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("এই ইউজারকে ডিলিট করতে চান?")) {
                              deleteUser(user.id);
                            }
                          }}
                          disabled={user.id === authState.user?.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-6">
            <h2 className="text-xl font-bold">কন্টেন্ট ম্যানেজমেন্ট</h2>

            <Card>
              <CardHeader>
                <CardTitle>সকল পোস্ট</CardTitle>
                <CardDescription>
                  সিস্টেমের সকল পোস্ট দেখুন এবং ম্যানেজ করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.posts.map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="font-medium">
                            {post.author.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {post.timeAgo}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mb-2">
                        {post.isHtml ? (
                          <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          />
                        ) : (
                          <p>{post.content}</p>
                        )}
                      </div>

                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          className="rounded-lg mb-2 max-h-40 object-cover"
                        />
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          {Object.values(post.reactions).reduce(
                            (sum, r) => sum + r.count,
                            0,
                          )}{" "}
                          রিয়া���শন
                        </span>
                        <span>{post.comments.length} কমেন্ট</span>
                        <span>{post.shares} শেয়ার</span>
                      </div>

                      {post.comments.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium">কমেন্টসমূহ:</h4>
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="flex justify-between items-start p-2 bg-gray-50 rounded"
                            >
                              <div className="flex space-x-2">
                                <img
                                  src={comment.author.avatar}
                                  alt={comment.author.name}
                                  className="h-6 w-6 rounded-full"
                                />
                                <div>
                                  <span className="font-medium text-sm">
                                    {comment.author.name}
                                  </span>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteComment(post.id, comment.id)
                                }
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* App Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-bold">অ্যাপ সেটিংস</h2>

            <Card>
              <CardHeader>
                <CardTitle>সাধারণ সেটিংস</CardTitle>
                <CardDescription>
                  অ্যাপের মূল সেটিংস পরিবর্তন করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="appName">অ্যাপের নাম</Label>
                  <Input
                    id="appName"
                    value={adminSettings.appName}
                    onChange={(e) =>
                      updateAdminSettings({ appName: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">ফিচার কন্ট্রোল</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>নতুন রেজিস্ট্রেশন</Label>
                      <p className="text-sm text-gray-500">
                        নতুন ইউজার রেজিস্টার করতে পারবে
                      </p>
                    </div>
                    <Switch
                      checked={adminSettings.allowRegistration}
                      onCheckedChange={(checked) =>
                        updateAdminSettings({ allowRegistration: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>পোস্ট করা</Label>
                      <p className="text-sm text-gray-500">
                        ইউজাররা পোস্ট করতে পারবে
                      </p>
                    </div>
                    <Switch
                      checked={adminSettings.allowPosts}
                      onCheckedChange={(checked) =>
                        updateAdminSettings({ allowPosts: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>স্টোরি পোস্ট</Label>
                      <p className="text-sm text-gray-500">
                        ইউজাররা স্টোরি পোস্ট করতে পারবে
                      </p>
                    </div>
                    <Switch
                      checked={adminSettings.allowStories}
                      onCheckedChange={(checked) =>
                        updateAdminSettings({ allowStories: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>কমেন্ট</Label>
                      <p className="text-sm text-gray-500">
                        ইউজাররা কমেন্ট করতে পারবে
                      </p>
                    </div>
                    <Switch
                      checked={adminSettings.allowComments}
                      onCheckedChange={(checked) =>
                        updateAdminSettings({ allowComments: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>রিয়াকশন</Label>
                      <p className="text-sm text-gray-500">
                        ইউজাররা রিয়াকশন দিতে পারবে
                      </p>
                    </div>
                    <Switch
                      checked={adminSettings.allowReactions}
                      onCheckedChange={(checked) =>
                        updateAdminSettings({ allowReactions: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>মডারেশন</Label>
                      <p className="text-sm text-gray-500">
                        পোস্ট এবং কমেন্ট অটো মডারেশন
                      </p>
                    </div>
                    <Switch
                      checked={adminSettings.moderationEnabled}
                      onCheckedChange={(checked) =>
                        updateAdminSettings({ moderationEnabled: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-bold">অ্যানালিটিক্স</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ইউজার পরিসংখ্যান</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>মোট ইউজার:</span>
                      <span className="font-bold">{stats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>সক্রিয় ইউজার:</span>
                      <span className="font-bold text-green-600">
                        {stats.activeUsers}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>নিষ্ক্রিয় ইউজার:</span>
                      <span className="font-bold text-red-600">
                        {inactiveUsers.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>���ন্টেন্ট পরিসংখ্যান</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>মোট পোস্ট:</span>
                      <span className="font-bold">{stats.totalPosts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>মোট কমেন্ট:</span>
                      <span className="font-bold">{stats.totalComments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>মোট রিয়াকশন:</span>
                      <span className="font-bold">{stats.totalReactions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
