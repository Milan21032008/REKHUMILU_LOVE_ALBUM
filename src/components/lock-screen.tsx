
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, LockKeyhole } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LockScreenProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = 'REKHUMILU2008';

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === CORRECT_PASSWORD) {
      setError(false);
      toast({
        title: 'Welcome!',
        description: 'The album is unlocked.',
      });
      onUnlock();
    } else {
      setError(true);
      toast({
        variant: 'destructive',
        title: 'Incorrect Password',
        description: 'Please try again.',
      });
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4 relative z-10">
      <Card className="w-full max-w-sm text-center shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-center items-center mb-4">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">special for rekhu</CardTitle>
          <CardDescription>This album is private. Please enter the password to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`pl-10 ${error ? 'border-destructive ring-destructive' : ''}`}
                aria-label="Password"
              />
            </div>
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground mx-auto">
            Awaiting a special moment...
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
