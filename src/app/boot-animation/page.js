'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BootAnimation() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome-page');
    }, 6000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ background: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="/171297_Marshmallow.gif" alt="Boot animation" style={{ width: '300px' }} />
    </div>
  );
}
