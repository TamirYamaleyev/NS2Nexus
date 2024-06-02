import { useEffect, useState } from 'react';

function useFormatTimeLength(seconds) {
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        const formatTimeLength = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = Math.round(seconds % 60); // Round up or down to the nearest second

            let formattedHours = '';
            if (hours > 0) {
                formattedHours = `${hours.toString().padStart(2, '0')}:`;
            }

            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

            return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
        };

        setFormattedTime(formatTimeLength(seconds));
    }, [seconds]);

    return formattedTime;
}

export default useFormatTimeLength;
