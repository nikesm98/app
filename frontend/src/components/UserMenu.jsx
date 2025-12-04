import { useClerk, useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { LogOut, LogIn, User } from 'lucide-react';

export const UserMenu = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <SignInButton>
        <Button
          variant="default"
          className="gap-2"
          style={{ backgroundColor: '#007BC1' }}
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </SignInButton>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium" style={{ color: '#204788' }}>
        {user?.firstName || user?.primaryEmailAddress?.emailAddress}
      </span>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonBox: 'flex-row-reverse',
            userButtonTrigger: 'focus:shadow-none'
          }
        }}
      />
    </div>
  );
};
