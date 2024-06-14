import { useState, useEffect } from 'react';

const useTimeType = (timestamp) => {
    const [timeType, setTimeType] = useState(null);

    useEffect(() => {
        const calculateTimeType = () => {
            const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp (seconds)
            const difference = currentTime - timestamp;

            if (difference < 60) {
                setTimeType('just now');
            } else if (difference < 3600) {
                const minutes = Math.floor(difference / 60);
                setTimeType(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`);
            } else if (difference < 86400) {
                const hours = Math.floor(difference / 3600);
                setTimeType(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
            } else if (difference < 604800) {
                const days = Math.floor(difference / 86400);
                setTimeType(`${days} day${days !== 1 ? 's' : ''} ago`);
            } else if (difference < 2592000) {
                const weeks = Math.floor(difference / 604800);
                setTimeType(`${weeks} week${weeks !== 1 ? 's' : ''} ago`);
            } else if (difference < 31536000) {
                const months = Math.floor(difference / 2592000);
                setTimeType(`${months} month${months !== 1 ? 's' : ''} ago`);
            } else {
                const years = Math.floor(difference / 31536000);
                setTimeType(`${years} year${years !== 1 ? 's' : ''} ago`);
            }
        };

        calculateTimeType();
    }, [timestamp]);

    return timeType;
};

export default useTimeType;
