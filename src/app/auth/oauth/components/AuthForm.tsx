'use client';

import React from 'react';

import createSupabaseBrowerClient from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default function AuthForm() {
  const supabase = createSupabaseBrowerClient();

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="space-y-5">
      <h1>Login with oAuth</h1>
      <Button className="w-full" onClick={loginWithGoogle}>
        Login with Google
      </Button>
    </div>
  );
}
