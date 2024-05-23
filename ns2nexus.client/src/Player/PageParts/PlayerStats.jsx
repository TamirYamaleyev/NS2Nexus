import SecondaryStatBox from '../Components/SecondaryStatBox';

const PlayerStats = ({ playerStats }) => (
    <div>
        <SecondaryStatBox title="Score Per Hour (Alien)" side="alien" />
        {/* Add more SecondaryStatBox components as needed */}
    </div>
);

export default PlayerStats;
