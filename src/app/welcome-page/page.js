'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import helloAnimation from '../../assests/hello-animation.json';
import './hello.css';

export default function HelloLottie() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3500); 

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div className="lottie-wrapper">
      <div className="background" />
      <div className="overlay" />
      <div className="lottie-content">
        <Lottie
          animationData={helloAnimation}
          style={{ width: 200, height: 200 }}
        />
      </div>
    </div>
  );
}
