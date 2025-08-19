export interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'angry' | 'sad';

export interface Reaction {
  type: ReactionType;
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

export interface AppContextType {
  state: AppState;
  addPost: (content: string, image?: string) => void;
  addStory: (image: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  sharePost: (postId: string) => void;
}
