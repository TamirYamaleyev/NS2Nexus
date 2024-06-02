import { useState, useEffect } from 'react';

const useTimeType = (roundDate, format) => {
    const [timeType, setTimeType] = useState(null);

    useEffect(() => {
        const calculateTimeType = () => {
            const currentTime = new Date().getTime();
            const difference = currentTime - roundDate;

            if (difference < 60000) {
                setTimeType('just now');
            } else if (difference < 3600000) {
                setTimeType(Math.floor(difference / 60000) + ' minutes ago');
            } else {
                setTimeType(Math.floor(difference / 3600000) + ' hours ago');
            }
        };

        calculateTimeType();

        // If you have any cleanup logic, you can include it here
        return () => {
            // Cleanup logic if needed
        };
    }, [roundDate, format]);

    return timeType;
};

export default useTimeType;
