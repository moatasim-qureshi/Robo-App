'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

export default function RoboBootAnimation() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/boot-animation'); // Navigate after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="boot-screen">
      <h1 className="boot-logo">ROBO APP</h1>
    </div>
  );
}
