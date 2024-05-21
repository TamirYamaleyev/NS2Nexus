import React from 'react';
import SecondaryStatBox from './SecondaryStatBox';

const PlayerStats = ({ playerStats }) => (
    <div>
        <SecondaryStatBox title="Score Per Hour (Alien)" side="alien" />
        {/* Add more SecondaryStatBox components as needed */}
    </div>
);

export default PlayerStats;
