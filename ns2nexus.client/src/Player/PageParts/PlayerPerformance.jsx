import PropTypes from 'prop-types';
import StatBox from '../Components/StatBox';

const PlayerPerformance = ({ playerStats }) => (
    <div>
        <StatBox
            title="Skill"
            totalValue={playerStats.hiveSkill}
            marineValue={playerStats.hiveSkillMarine}
            alienValue={playerStats.hiveSkillAlien}
        />
        <StatBox
            title="Commander Skill"
            totalValue={playerStats.commanderSkill}
            marineValue={playerStats.commanderSkillMarine}
            alienValue={playerStats.commanderSkillAlien}
        />
        <StatBox
            title="Accuracy"
            marineValue={`${playerStats.marineAccuracy}%`}
            alienValue={`${playerStats.alienAccuracy}%`}
        />
        <StatBox
            title="Kill Death Ratio"
            marineValue={playerStats.marineKdr}
            alienValue={playerStats.alienKdr}
        />
    </div>
);

PlayerPerformance.propTypes = {
    playerStats: PropTypes.shape({
        hiveSkill: PropTypes.number,
        hiveSkillMarine: PropTypes.number,
        hiveSkillAlien: PropTypes.number,
        commanderSkill: PropTypes.number,
        commanderSkillMarine: PropTypes.number,
        commanderSkillAlien: PropTypes.number,
        marineAccuracy: PropTypes.number,
        alienAccuracy: PropTypes.number,
        marineKdr: PropTypes.number,
        alienKdr: PropTypes.number
    }).isRequired
};

export default PlayerPerformance;
