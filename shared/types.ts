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

export interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
  profile?: UserProfile;
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

export interface AppContextType {
  state: AppState;
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
}
