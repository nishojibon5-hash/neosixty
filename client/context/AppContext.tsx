import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppContextType, Post, Story, Comment, User } from '@shared/types';

const currentUser: User = {
  id: 'current-user',
  name: 'Md Salman',
  avatar: '/placeholder.svg',
  username: 'md.salman'
};

const initialStories: Story[] = [
  {
    id: 'story-1',
    author: { id: 'ahmed', name: 'Ahmed Khan', avatar: '/placeholder.svg', username: 'ahmed.khan' },
    image: '/placeholder.svg',
    timeAgo: '2 hours ago',
    isViewed: false
  },
  {
    id: 'story-2', 
    author: { id: 'sarah', name: 'Sarah Ali', avatar: '/placeholder.svg', username: 'sarah.ali' },
    image: '/placeholder.svg',
    timeAgo: '4 hours ago',
    isViewed: false
  }
];

const initialPosts: Post[] = [
  {
    id: 'post-1',
    author: { id: 'ahmed', name: 'Ahmed Khan', avatar: '/placeholder.svg', username: 'ahmed.khan' },
    content: 'Just finished building my first React Native app! 🚀 The journey from web development to mobile has been incredible. Can\'t wait to share it with everyone soon.',
    timeAgo: '2 hours ago',
    likes: 42,
    comments: [
      {
        id: 'comment-1',
        author: currentUser,
        content: 'Congratulations! That\'s amazing progress.',
        timeAgo: '1 hour ago',
        likes: 5
      }
    ],
    shares: 3,
    isLiked: false
  },
  {
    id: 'post-2',
    author: { id: 'sarah', name: 'Sarah Ali', avatar: '/placeholder.svg', username: 'sarah.ali' },
    content: 'Beautiful sunset from my rooftop today. Sometimes we need to pause and appreciate the simple moments in life. 🌅 What made you smile today?',
    image: '/placeholder.svg',
    timeAgo: '4 hours ago',
    likes: 127,
    comments: [],
    shares: 12,
    isLiked: true
  }
];

const initialState: AppState = {
  currentUser,
  posts: initialPosts,
  stories: initialStories
};

type Action = 
  | { type: 'ADD_POST'; payload: { content: string; image?: string } }
  | { type: 'ADD_STORY'; payload: { image: string } }
  | { type: 'TOGGLE_LIKE'; payload: { postId: string } }
  | { type: 'ADD_COMMENT'; payload: { postId: string; content: string } }
  | { type: 'LIKE_COMMENT'; payload: { postId: string; commentId: string } }
  | { type: 'SHARE_POST'; payload: { postId: string } };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_POST': {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: state.currentUser,
        content: action.payload.content,
        image: action.payload.image,
        timeAgo: 'Just now',
        likes: 0,
        comments: [],
        shares: 0,
        isLiked: false
      };
      return {
        ...state,
        posts: [newPost, ...state.posts]
      };
    }
    
    case 'ADD_STORY': {
      const newStory: Story = {
        id: `story-${Date.now()}`,
        author: state.currentUser,
        image: action.payload.image,
        timeAgo: 'Just now',
        isViewed: false
      };
      return {
        ...state,
        stories: [newStory, ...state.stories]
      };
    }
    
    case 'TOGGLE_LIKE': {
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1
              }
            : post
        )
      };
    }
    
    case 'ADD_COMMENT': {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        author: state.currentUser,
        content: action.payload.content,
        timeAgo: 'Just now',
        likes: 0
      };
      
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...post.comments, newComment]
              }
            : post
        )
      };
    }
    
    case 'SHARE_POST': {
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                shares: post.shares + 1
              }
            : post
        )
      };
    }
    
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const addPost = (content: string, image?: string) => {
    dispatch({ type: 'ADD_POST', payload: { content, image } });
  };
  
  const addStory = (image: string) => {
    dispatch({ type: 'ADD_STORY', payload: { image } });
  };
  
  const toggleLike = (postId: string) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: { postId } });
  };
  
  const addComment = (postId: string, content: string) => {
    dispatch({ type: 'ADD_COMMENT', payload: { postId, content } });
  };
  
  const likeComment = (postId: string, commentId: string) => {
    dispatch({ type: 'LIKE_COMMENT', payload: { postId, commentId } });
  };
  
  const sharePost = (postId: string) => {
    dispatch({ type: 'SHARE_POST', payload: { postId } });
  };
  
  const value: AppContextType = {
    state,
    addPost,
    addStory,
    toggleLike,
    addComment,
    likeComment,
    sharePost
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
