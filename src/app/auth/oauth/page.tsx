import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { config } from '@/config';
import { readUserSession } from '@/lib/actions';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';

import AuthForm from './components/AuthForm';

export const metadata = { title: `Sign in | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <AuthForm />
      </GuestGuard>
    </Layout>
  );
}
