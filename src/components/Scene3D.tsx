"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Blob3D = dynamic(() => import('./CryptechoBlob'), {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[400px] bg-transparent" />,
});

export default function Scene3D({ color }: { color?: string }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check for mobile user agent or screen width
        const checkMobile = () => {
            const isMobileDevice = typeof window !== 'undefined' && (
                window.matchMedia('(max-width: 768px)').matches ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            );
            setIsMobile(isMobileDevice);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                {/* Fallback to video loop on mobile for max performance */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/fallback/blob.webp"
                    className="w-full h-full object-contain opacity-80 mix-blend-screen"
                    style={{ maxWidth: '80%' }}
                >
                    <source src="/fallback/blob.mp4" type="video/mp4" />
                </video>
            </div>
        );
    }

    return <Blob3D />;
}
