export interface WorkInfo {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
}

export interface EducationInfo {
  id: string;
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startYear: string;
  endYear?: string;
}

export interface UserProfile {
  bio?: string;
  coverPhoto?: string;
  location?: string;
  website?: string;
  phoneNumber?: string;
  email?: string;
  birthday?: string;
  relationshipStatus?: 'Single' | 'In a relationship' | 'Married' | 'Complicated';
  work: WorkInfo[];
  education: EducationInfo[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  interests: string[];
  languages: string[];
}

export type UserRole = 'user' | 'editor' | 'moderator' | 'admin';

export interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
  profile?: UserProfile;
  followerCount: number;
  followingCount: number;
  isVerified: boolean;
  phoneNumber?: string;
  email?: string;
  password?: string;
  role: UserRole;
  createdAt: string;
  isActive: boolean;
}

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'angry' | 'sad';

export interface Reaction {
  count: number;
  users: string[]; // user IDs who reacted
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  image?: string;
  video?: string;
  timeAgo: string;
  likes: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  isHtml: boolean;
  image?: string;
  video?: string;
  timeAgo: string;
  reactions: Record<ReactionType, Reaction>;
  comments: Comment[];
  shares: number;
  mentions?: string[]; // user IDs mentioned
  tags?: string[]; // hashtags
}

export interface Story {
  id: string;
  author: User;
  image: string;
  timeAgo: string;
  isViewed: boolean;
}

export interface AppState {
  currentUser: User;
  posts: Post[];
  stories: Story[];
}

export interface FriendRequest {
  id: string;
  from: User;
  to: User;
  status: 'pending' | 'accepted' | 'rejected';
  timeAgo: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export interface LoginCredentials {
  phoneOrEmail: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phoneOrEmail: string;
  password: string;
}

export interface AdminSettings {
  appName: string;
  allowRegistration: boolean;
  allowPosts: boolean;
  allowStories: boolean;
  allowComments: boolean;
  allowReactions: boolean;
  moderationEnabled: boolean;
}

export interface AppContextType {
  state: AppState;
  authState: AuthState;
  adminSettings: AdminSettings;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  addPost: (content: string, isHtml: boolean, image?: string, video?: string, mentions?: string[], tags?: string[]) => void;
  addStory: (image: string) => void;
  addReaction: (postId: string, reactionType: ReactionType) => void;
  removeReaction: (postId: string, reactionType: ReactionType) => void;
  addComment: (postId: string, content: string, image?: string, video?: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  sharePost: (postId: string) => void;
  sendFriendRequest: (userId: string) => void;
  acceptFriendRequest: (requestId: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  updateUserProfile: (profile: UserProfile) => void;
  updateUserAvatar: (avatar: string) => void;
  updateFollowerCount: (userId: string, increment: boolean) => void;
  checkAndUpdateVerification: (userId: string) => void;
  createUser: (userData: RegisterData & { role: UserRole }) => Promise<boolean>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  getAllUsers: () => User[];
  toggleUserStatus: (userId: string) => Promise<boolean>;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  deletePost: (postId: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
}
