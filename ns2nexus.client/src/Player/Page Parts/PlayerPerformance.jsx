import StatBox from './StatBox';

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

export default PlayerPerformance;
