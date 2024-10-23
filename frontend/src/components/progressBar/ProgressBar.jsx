import React from 'react'
import './ProgressBar.css'; // You can create a separate CSS file for styling

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar">
            <div
                className="progress-bar__fill"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
