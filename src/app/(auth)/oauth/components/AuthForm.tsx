'use client';

import React from 'react';
import { flexbox } from '@mui/system';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

import { loginWithGoogle } from './loginWithGoogle';

export default function AuthForm() {
  return (
    <form
      className="space-y-5"
      action={loginWithGoogle}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}
    >
      <h1>Welcome to Nasco World !</h1>
      <Button
        className="w-full"
        type="submit"
        style={{
          color: 'black',
          padding: '10px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '12px',
        }}
      >
        <FcGoogle style={{ marginRight: 'auto' }} size={30} color="white" />
        <span style={{ flex: 1 }}>Sign in with Google</span>
      </Button>
    </form>
  );
}