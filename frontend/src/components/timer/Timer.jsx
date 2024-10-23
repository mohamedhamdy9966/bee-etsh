import React from 'react'
import { useState, useRef, useEffect } from 'react'; 
import './Timer.css';

function Timer({ duration, onFinish }) {

    const [timeRemaining, setTimeRemaining] = useState(duration);
    const timerElementRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const hours = Math.floor(timeRemaining / 3600);
            const minutes = Math.floor((timeRemaining % 3600) / 60);
            const seconds = timeRemaining % 60;

            if (timerElementRef.current) {
                timerElementRef.current.innerHTML = `<i class="fa-solid fa-clock"></i> Section Time Remaining: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
            }

            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    onFinish();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeRemaining, onFinish]);

    const formatTime = (time) => time < 10 ? `0${time}` : time;

    return (
        <div ref={timerElementRef} className="timer"></div>
    );
}

export default Timer;