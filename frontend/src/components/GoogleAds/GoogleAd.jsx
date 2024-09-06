import React, { useEffect, useRef } from 'react';
import './GoogleAd.css';

const GoogleAd = () => {
    const adLoaded = useRef(false);

    useEffect(() => {
        // Check if adsbygoogle is available and if the ad has not been loaded
        if (window.adsbygoogle && !adLoaded.current) {
            window.adsbygoogle.push({});
            adLoaded.current = true; // Mark the ad as loaded
        }
    }, []);

    return (
        <div className="ad-container">
            <ins className="adsbygoogle"
                 style={{ display: 'inline-block', width: '100%', height: '250px' }}
                    data-ad-client="ca-pub-2460610949077468"
                    data-ad-slot="1993296104"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
    );
};

export default GoogleAd;