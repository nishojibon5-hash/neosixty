export interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timeAgo: string;
  likes: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  timeAgo: string;
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked: boolean;
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
