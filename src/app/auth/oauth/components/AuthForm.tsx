'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

import { loginWithGoogle } from './loginWithGoogle';

export default function AuthForm() {
  return (
    <form className="space-y-5" action={loginWithGoogle}>
      <h1>Login with oAuth</h1>
      <Button className="w-full" type="submit">
        Login with Google
      </Button>
    </form>
  );
}
