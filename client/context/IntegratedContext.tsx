import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useApp } from './AppContext';

export function ContextIntegration({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();
  const { updateCurrentUser, state } = useApp();

  // Sync authenticated user with app context
  useEffect(() => {
    if (authState.user && authState.user.id !== state.currentUser.id) {
      updateCurrentUser(authState.user);
    }
  }, [authState.user, state.currentUser.id, updateCurrentUser]);

  return <>{children}</>;
}
