'use client';

import Triples from 'components/Triples';
import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
  const { ready } = usePrivy();

  if (!ready) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-200 p-4 text-slate-800">
      <Triples />
    </main>
  );
}
