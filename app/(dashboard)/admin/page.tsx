'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.push('/sign-in');
    return null;
  }

  const handleHomeRedirect = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50">
      <h1 className="text-3xl font-bold text-neutral-900">
        Welcome !
      </h1>
      <p className="mt-2 text-xl text-neutral-700">
        You are now logged in to your dashboard.
      </p>
      <button
        onClick={handleHomeRedirect}
        className="mt-6 rounded-md bg-orange-400 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
      >
        Go to Home Page
      </button>
    </div>
  );
}
