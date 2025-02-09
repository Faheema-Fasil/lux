'use client';

import React, { useEffect, useState } from 'react';
import NextTopLoader from 'nextjs-toploader';

export default function NextProgress() {
    const [primaryColor, setPrimaryColor] = useState('');

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const color = rootStyles.getPropertyValue('--primary-color').trim();
        setPrimaryColor(color);
    }, []);

    if (!primaryColor) return null; 

    return (
        <NextTopLoader
            showSpinner={false}
            crawlSpeed={100}
            speed={100}
            height={5}
            color={primaryColor} 
            shadow={`0 0 10px ${primaryColor}, 0 0 5px ${primaryColor}`} 
            zIndex={1600}
        />
    );
}
