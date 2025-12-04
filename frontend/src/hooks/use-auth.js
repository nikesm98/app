import { useUser, useClerk } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { session } = useClerk();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (session) {
      session.getToken().then(setToken);
    }
  }, [session, isSignedIn]);

  return {
    user,
    isSignedIn,
    isLoaded,
    token,
    userId: user?.id,
    email: user?.primaryEmailAddress?.emailAddress,
    firstName: user?.firstName,
    lastName: user?.lastName
  };
};
