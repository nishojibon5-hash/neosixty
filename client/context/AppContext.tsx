import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppContextType, Post, Story, Comment, User, ReactionType, FriendRequest, UserProfile, AuthState, LoginCredentials, RegisterData, UserRole, AdminSettings } from '@shared/types';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

// Default user for initialization - will be replaced with authenticated user
const defaultUser: User = {
  id: 'default-user',
  name: 'Default User',
  avatar: '/placeholder.svg',
  username: 'default',
  followerCount: 0,
  followingCount: 0,
  isVerified: false,
  role: 'user',
  createdAt: new Date().toISOString(),
  isActive: true,
  profile: {
    bio: "",
    work: [],
    education: [],
    location: '',
    interests: [],
    languages: [],
    socialLinks: {}
  }
};

const initialStories: Story[] = [
  {
    id: 'story-1',
    author: {
      id: 'ahmed',
      name: 'Ahmed Khan',
      avatar: '/placeholder.svg',
      username: 'ahmed.khan',
      followerCount: 2500,
      followingCount: 340,
      isVerified: true
    },
    image: '/placeholder.svg',
    timeAgo: '2 hours ago',
    isViewed: false
  },
  {
    id: 'story-2',
    author: {
      id: 'sarah',
      name: 'Sarah Ali',
      avatar: '/placeholder.svg',
      username: 'sarah.ali',
      followerCount: 1200,
      followingCount: 920,
      isVerified: false
    },
    image: '/placeholder.svg',
    timeAgo: '4 hours ago',
    isViewed: false
  }
];

const createEmptyReactions = () => ({
  like: { count: 0, users: [] },
  love: { count: 0, users: [] },
  haha: { count: 0, users: [] },
  wow: { count: 0, users: [] },
  angry: { count: 0, users: [] },
  sad: { count: 0, users: [] }
});

const initialPosts: Post[] = [
  {
    id: 'post-1',
    author: {
      id: 'ahmed',
      name: 'Ahmed Khan',
      avatar: '/placeholder.svg',
      username: 'ahmed.khan',
      followerCount: 2500,
      followingCount: 340,
      isVerified: true
    },
    content: 'Just finished building my first React Native app! 🚀 The journey from web development to mobile has been incredible. Can\'t wait to share it with everyone soon.',
    isHtml: false,
    timeAgo: '2 hours ago',
    reactions: {
      ...createEmptyReactions(),
      like: { count: 42, users: ['user1', 'user2'] }
    },
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
    mentions: ['md.salman'],
    tags: ['reactnative', 'mobile']
  },
  {
    id: 'post-2',
    author: {
      id: 'sarah',
      name: 'Sarah Ali',
      avatar: '/placeholder.svg',
      username: 'sarah.ali',
      followerCount: 1200,
      followingCount: 920,
      isVerified: false
    },
    content: '<div style="padding: 20px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; color: white; text-align: center;"><h2>🌅 Beautiful Sunset</h2><p>Sometimes we need to pause and appreciate the simple moments in life.</p><p><strong>What made you smile today?</strong></p></div>',
    isHtml: true,
    image: '/placeholder.svg',
    timeAgo: '4 hours ago',
    reactions: {
      ...createEmptyReactions(),
      love: { count: 87, users: ['currentUser', 'user3'] },
      wow: { count: 40, users: ['user4'] }
    },
    comments: [],
    shares: 12,
    tags: ['sunset', 'nature']
  }
];

const initialState: AppState = {
  currentUser: defaultUser,
  posts: initialPosts,
  stories: initialStories
};

type Action =
  | { type: 'ADD_POST'; payload: { content: string; isHtml: boolean; image?: string; video?: string; mentions?: string[]; tags?: string[] } }
  | { type: 'ADD_STORY'; payload: { image: string } }
  | { type: 'ADD_REACTION'; payload: { postId: string; reactionType: ReactionType } }
  | { type: 'REMOVE_REACTION'; payload: { postId: string; reactionType: ReactionType } }
  | { type: 'ADD_COMMENT'; payload: { postId: string; content: string; image?: string; video?: string } }
  | { type: 'LIKE_COMMENT'; payload: { postId: string; commentId: string } }
  | { type: 'SHARE_POST'; payload: { postId: string } }
  | { type: 'SEND_FRIEND_REQUEST'; payload: { userId: string } }
  | { type: 'ACCEPT_FRIEND_REQUEST'; payload: { requestId: string } }
  | { type: 'FOLLOW_USER'; payload: { userId: string } }
  | { type: 'UNFOLLOW_USER'; payload: { userId: string } }
  | { type: 'UPDATE_USER_PROFILE'; payload: { profile: UserProfile } }
  | { type: 'UPDATE_USER_AVATAR'; payload: { avatar: string } }
  | { type: 'UPDATE_FOLLOWER_COUNT'; payload: { userId: string; increment: boolean } }
  | { type: 'UPDATE_VERIFICATION'; payload: { userId: string; isVerified: boolean } }
  | { type: 'DELETE_POST'; payload: { postId: string } }
  | { type: 'DELETE_COMMENT'; payload: { postId: string; commentId: string } }
  | { type: 'UPDATE_CURRENT_USER'; payload: { user: User } };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_POST': {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: state.currentUser,
        content: action.payload.content,
        isHtml: action.payload.isHtml,
        image: action.payload.image,
        video: action.payload.video,
        timeAgo: 'Just now',
        reactions: createEmptyReactions(),
        comments: [],
        shares: 0,
        mentions: action.payload.mentions,
        tags: action.payload.tags
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
    
    case 'ADD_REACTION': {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            const reactions = { ...post.reactions };
            const reactionType = action.payload.reactionType;
            
            reactions[reactionType] = {
              count: reactions[reactionType].count + 1,
              users: [...reactions[reactionType].users, state.currentUser.id]
            };
            
            return { ...post, reactions };
          }
          return post;
        })
      };
    }
    
    case 'REMOVE_REACTION': {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            const reactions = { ...post.reactions };
            const reactionType = action.payload.reactionType;
            
            reactions[reactionType] = {
              count: Math.max(0, reactions[reactionType].count - 1),
              users: reactions[reactionType].users.filter(userId => userId !== state.currentUser.id)
            };
            
            return { ...post, reactions };
          }
          return post;
        })
      };
    }
    
    case 'ADD_COMMENT': {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        author: state.currentUser,
        content: action.payload.content,
        image: action.payload.image,
        video: action.payload.video,
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
    
    case 'UPDATE_USER_PROFILE': {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          profile: action.payload.profile
        }
      };
    }

    case 'UPDATE_USER_AVATAR': {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: action.payload.avatar
        }
      };
    }

    case 'UPDATE_FOLLOWER_COUNT': {
      const updateUser = (user: User) => {
        if (user.id === action.payload.userId) {
          return {
            ...user,
            followerCount: action.payload.increment
              ? user.followerCount + 1
              : Math.max(0, user.followerCount - 1)
          };
        }
        return user;
      };

      return {
        ...state,
        currentUser: updateUser(state.currentUser),
        posts: state.posts.map(post => ({
          ...post,
          author: updateUser(post.author),
          comments: post.comments.map(comment => ({
            ...comment,
            author: updateUser(comment.author)
          }))
        })),
        stories: state.stories.map(story => ({
          ...story,
          author: updateUser(story.author)
        }))
      };
    }

    case 'UPDATE_VERIFICATION': {
      const updateUserVerification = (user: User) => {
        if (user.id === action.payload.userId) {
          return {
            ...user,
            isVerified: action.payload.isVerified
          };
        }
        return user;
      };

      return {
        ...state,
        currentUser: updateUserVerification(state.currentUser),
        posts: state.posts.map(post => ({
          ...post,
          author: updateUserVerification(post.author),
          comments: post.comments.map(comment => ({
            ...comment,
            author: updateUserVerification(comment.author)
          }))
        })),
        stories: state.stories.map(story => ({
          ...story,
          author: updateUserVerification(story.author)
        }))
      };
    }

    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.postId)
      };
    }

    case 'DELETE_COMMENT': {
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.filter(comment => comment.id !== action.payload.commentId)
              }
            : post
        )
      };
    }

    case 'UPDATE_CURRENT_USER': {
      return {
        ...state,
        currentUser: action.payload.user
      };
    }

    case 'SEND_FRIEND_REQUEST':
    case 'ACCEPT_FRIEND_REQUEST':
    case 'FOLLOW_USER':
    case 'UNFOLLOW_USER':
      // These would typically interact with a backend API
      // For now, just return the state unchanged
      return state;

    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Import auth context to sync current user
  const authContext = useAuth();

  // Update current user when authentication changes
  React.useEffect(() => {
    if (authContext.authState.user && authContext.authState.user.id !== state.currentUser.id) {
      dispatch({
        type: 'UPDATE_CURRENT_USER',
        payload: { user: authContext.authState.user }
      });
    }
  }, [authContext.authState.user, state.currentUser.id]);

  const addPost = (content: string, isHtml: boolean, image?: string, video?: string, mentions?: string[], tags?: string[]) => {
    dispatch({
      type: 'ADD_POST',
      payload: { content, isHtml, image, video, mentions, tags }
    });
  };

  const deletePost = (postId: string) => {
    dispatch({ type: 'DELETE_POST', payload: { postId } });
    toast.success('পোস্ট ডিলিট হয়েছে');
  };

  const deleteComment = (postId: string, commentId: string) => {
    dispatch({ type: 'DELETE_COMMENT', payload: { postId, commentId } });
    toast.success('কমেন্ট ডিলিট হয়েছে');
  };
  
  const addStory = (image: string) => {
    dispatch({ type: 'ADD_STORY', payload: { image } });
  };
  
  const addReaction = (postId: string, reactionType: ReactionType) => {
    dispatch({ type: 'ADD_REACTION', payload: { postId, reactionType } });
  };
  
  const removeReaction = (postId: string, reactionType: ReactionType) => {
    dispatch({ type: 'REMOVE_REACTION', payload: { postId, reactionType } });
  };
  
  const addComment = (postId: string, content: string, image?: string, video?: string) => {
    dispatch({ type: 'ADD_COMMENT', payload: { postId, content, image, video } });
  };
  
  const likeComment = (postId: string, commentId: string) => {
    dispatch({ type: 'LIKE_COMMENT', payload: { postId, commentId } });
  };
  
  const sharePost = (postId: string) => {
    dispatch({ type: 'SHARE_POST', payload: { postId } });
  };
  
  const sendFriendRequest = async (userId: string) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: 'SEND_FRIEND_REQUEST', payload: { userId } });
        resolve(true);
      }, 1000);
    });
  };
  
  const acceptFriendRequest = async (requestId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: 'ACCEPT_FRIEND_REQUEST', payload: { requestId } });
        resolve(true);
      }, 1000);
    });
  };
  
  const followUser = async (userId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: 'FOLLOW_USER', payload: { userId } });
        resolve(true);
      }, 1000);
    });
  };
  
  const unfollowUser = async (userId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: 'UNFOLLOW_USER', payload: { userId } });
        resolve(true);
      }, 1000);
    });
  };

  const updateUserProfile = (profile: UserProfile) => {
    dispatch({ type: 'UPDATE_USER_PROFILE', payload: { profile } });
  };

  const updateUserAvatar = (avatar: string) => {
    dispatch({ type: 'UPDATE_USER_AVATAR', payload: { avatar } });
  };

  const updateFollowerCount = (userId: string, increment: boolean) => {
    dispatch({ type: 'UPDATE_FOLLOWER_COUNT', payload: { userId, increment } });

    // Check if user should be verified after follower count update
    setTimeout(() => {
      checkAndUpdateVerification(userId);
    }, 100);
  };

  const checkAndUpdateVerification = (userId: string) => {
    const user = state.currentUser.id === userId
      ? state.currentUser
      : state.posts.find(p => p.author.id === userId)?.author ||
        state.stories.find(s => s.author.id === userId)?.author;

    if (user && user.followerCount >= 1000 && !user.isVerified) {
      dispatch({ type: 'UPDATE_VERIFICATION', payload: { userId, isVerified: true } });
      if (userId === state.currentUser.id) {
        toast.success("Congratulations! You've been verified with a blue badge!");
      }
    }
  };

  // Get auth context to provide auth methods
  const authContext = React.useContext(require('./AuthContext').AuthContext) || {
    authState: { isAuthenticated: false, user: null, isLoading: false },
    adminSettings: {
      appName: 'Neo sixty',
      allowRegistration: true,
      allowPosts: true,
      allowStories: true,
      allowComments: true,
      allowReactions: true,
      moderationEnabled: false
    },
    login: async () => false,
    register: async () => false,
    logout: () => {},
    createUser: async () => false,
    updateUser: async () => false,
    deleteUser: async () => false,
    getAllUsers: () => [],
    toggleUserStatus: async () => false,
    updateAdminSettings: () => {}
  };

  const value: AppContextType = {
    state,
    authState: authContext.authState,
    adminSettings: authContext.adminSettings,
    login: authContext.login,
    register: authContext.register,
    logout: authContext.logout,
    addPost,
    addStory,
    addReaction,
    removeReaction,
    addComment,
    likeComment,
    sharePost,
    sendFriendRequest,
    acceptFriendRequest,
    followUser,
    unfollowUser,
    updateUserProfile,
    updateUserAvatar,
    updateFollowerCount,
    checkAndUpdateVerification,
    createUser: authContext.createUser,
    updateUser: authContext.updateUser,
    deleteUser: authContext.deleteUser,
    getAllUsers: authContext.getAllUsers,
    toggleUserStatus: authContext.toggleUserStatus,
    updateAdminSettings: authContext.updateAdminSettings,
    deletePost,
    deleteComment
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
