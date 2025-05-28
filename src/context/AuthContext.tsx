import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, UserPreferences } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'admin' | 'patient') => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          username: session.user.email || '',
          role: session.user.user_metadata.role,
          preferences: session.user.user_metadata.preferences
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          username: session.user.email || '',
          role: session.user.user_metadata.role,
          preferences: session.user.user_metadata.preferences
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (username: string, password: string, role: 'admin' | 'patient'): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password
      });

      if (error) throw error;

      if (data.user?.user_metadata.role !== role) {
        await logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updatePreferences = async (preferences: UserPreferences) => {
    if (!user) return;

    try {
      const { error } = await supabase.auth.updateUser({
        data: { preferences }
      });

      if (error) throw error;

      setUser(prev => prev ? { ...prev, preferences } : null);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      updatePreferences 
    }}>
      {children}
    </AuthContext.Provider>
  );
};