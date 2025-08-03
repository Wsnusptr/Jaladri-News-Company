
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      // Redirect to the main web app's login page
      const webAppUrl = process.env.NEXT_PUBLIC_WEB_APP_URL ||
        (process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://jaladrinews.com');
      router.push(`${webAppUrl}/login`);
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || (session.user as any)?.role !== 'ADMIN') {
    return <div>Loading or redirecting...</div>; // Or a more sophisticated loading spinner
  }

  return <>{children}</>;
}
