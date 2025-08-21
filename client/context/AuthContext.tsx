import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { AuthState, LoginCredentials, RegisterData, User, UserRole, AdminSettings, AdCampaign, PaymentTransaction, UserEarnings, PaymentMethod } from '@shared/types';
import { toast } from 'sonner';

const ADMIN_PHONE = '01650074073';
const ADMIN_PASSWORD = 'Sal123@#$';

const initialAdminSettings: AdminSettings = {
  appName: 'Neo sixty',
  allowRegistration: true,
  allowPosts: true,
  allowStories: true,
  allowComments: true,
  allowReactions: true,
  moderationEnabled: false,
  monetizationEnabled: true,
  minimumWithdrawal: 30,
  adRevenueShare: 70
};

// In-memory user storage for this demo
let users: User[] = [
  {
    id: 'admin-1',
    name: 'Super Admin',
    avatar: '/placeholder.svg',
    username: 'admin',
    phoneNumber: ADMIN_PHONE,
    email: 'admin@neosixty.com',
    password: ADMIN_PASSWORD,
    role: 'admin',
    followerCount: 0,
    followingCount: 0,
    isVerified: true,
    createdAt: new Date().toISOString(),
    isActive: true,
    isProfessional: false,
    monetizationEnabled: false
  }
];

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false
};

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        isAuthenticated: true,
        user: action.payload,
        isLoading: false
      };
    
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        isAuthenticated: false,
        user: null,
        isLoading: false
      };
    
    case 'LOGOUT':
      return initialAuthState;
    
    default:
      return state;
  }
}

interface AuthContextType {
  authState: AuthState;
  adminSettings: AdminSettings;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  createUser: (userData: RegisterData & { role: UserRole }) => Promise<boolean>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  getAllUsers: () => User[];
  toggleUserStatus: (userId: string) => Promise<boolean>;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);
  const [adminSettings, setAdminSettings] = React.useState(initialAdminSettings);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('neo_sixty_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        // Verify user still exists and is active
        const existingUser = users.find(u => u.id === user.id && u.isActive);
        if (existingUser) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: existingUser });
        } else {
          localStorage.removeItem('neo_sixty_user');
        }
      } catch (error) {
        localStorage.removeItem('neo_sixty_user');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => 
      (u.phoneNumber === credentials.phoneOrEmail || u.email === credentials.phoneOrEmail) &&
      u.password === credentials.password &&
      u.isActive
    );

    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      localStorage.setItem('neo_sixty_user', JSON.stringify(user));
      toast.success(`স্বাগতম ${user.name}!`);
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      toast.error('ভুল ফোন নম্বর/ইমেইল অথবা পাসওয়ার্ড');
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    if (!adminSettings.allowRegistration) {
      toast.error('নতুন রেজিস্ট্রেশন বন্ধ রয়েছে');
      return false;
    }

    dispatch({ type: 'REGISTER_START' });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = users.find(u => 
      u.phoneNumber === data.phoneOrEmail || u.email === data.phoneOrEmail
    );

    if (existingUser) {
      dispatch({ type: 'REGISTER_FAILURE' });
      toast.error('এই ফোন নম্বর/ইমেইল ইতিমধ্যে নিবন্ধিত');
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      avatar: '/placeholder.svg',
      username: data.phoneOrEmail.replace(/[@+]/g, '').slice(-6),
      phoneNumber: data.phoneOrEmail.includes('@') ? undefined : data.phoneOrEmail,
      email: data.phoneOrEmail.includes('@') ? data.phoneOrEmail : undefined,
      password: data.password,
      role: 'user',
      followerCount: 0,
      followingCount: 0,
      isVerified: false,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    users.push(newUser);
    dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
    localStorage.setItem('neo_sixty_user', JSON.stringify(newUser));
    toast.success(`স্বাগতম ${newUser.name}! আপনার অ্যাকাউন্ট তৈরি হয়েছে`);
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('neo_sixty_user');
    toast.success('সফলভাবে লগআ��ট হয়েছে');
  };

  const createUser = async (userData: RegisterData & { role: UserRole }): Promise<boolean> => {
    // Only admins can create users
    if (authState.user?.role !== 'admin') {
      toast.error('অনুমতি নেই');
      return false;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = users.find(u => 
      u.phoneNumber === userData.phoneOrEmail || u.email === userData.phoneOrEmail
    );

    if (existingUser) {
      toast.error('এই ফোন নম্বর/ইমেইল ইতিমধ্যে নিবন্ধিত');
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      avatar: '/placeholder.svg',
      username: userData.phoneOrEmail.replace(/[@+]/g, '').slice(-6),
      phoneNumber: userData.phoneOrEmail.includes('@') ? undefined : userData.phoneOrEmail,
      email: userData.phoneOrEmail.includes('@') ? userData.phoneOrEmail : undefined,
      password: userData.password,
      role: userData.role,
      followerCount: 0,
      followingCount: 0,
      isVerified: userData.role === 'admin',
      createdAt: new Date().toISOString(),
      isActive: true
    };

    users.push(newUser);
    toast.success(`নতুন ${userData.role} তৈরি হয়েছে`);
    return true;
  };

  const updateUser = async (userId: string, updates: Partial<User>): Promise<boolean> => {
    if (authState.user?.role !== 'admin') {
      toast.error('অনুমতি নেই');
      return false;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      toast.error('ইউজার পাওয়া যায়নি');
      return false;
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    toast.success('ইউজার আপডেট হয়েছে');
    return true;
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    if (authState.user?.role !== 'admin') {
      toast.error('অনুমতি নেই');
      return false;
    }

    if (userId === authState.user.id) {
      toast.error('নিজেকে ডিলিট করতে পারবেন না');
      return false;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    users = users.filter(u => u.id !== userId);
    toast.success('ইউজার ডিলিট হয়েছে');
    return true;
  };

  const toggleUserStatus = async (userId: string): Promise<boolean> => {
    if (authState.user?.role !== 'admin') {
      toast.error('অনুমতি নেই');
      return false;
    }

    if (userId === authState.user.id) {
      toast.error('নিজেকে নিষ্ক্রিয় করতে পারবেন না');
      return false;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      toast.error('ইউজার পাওয়া যায়নি');
      return false;
    }

    users[userIndex].isActive = !users[userIndex].isActive;
    toast.success(`ইউজার ${users[userIndex].isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`);
    return true;
  };

  const getAllUsers = (): User[] => {
    if (authState.user?.role !== 'admin') {
      return [];
    }
    return users;
  };

  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    if (authState.user?.role === 'admin') {
      setAdminSettings(prev => ({ ...prev, ...settings }));
      toast.success('সেটিংস আপডেট হয়েছে');
    }
  };

  const value: AuthContextType = {
    authState,
    adminSettings,
    login,
    register,
    logout,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    toggleUserStatus,
    updateAdminSettings
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
