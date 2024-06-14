import PropTypes from 'prop-types';
import StatBox from '../Components/StatBox';
import Grid from '@mui/material/Grid';

function PlayerPerformance ({ playerStats }) { 

    const marineAccuracy = (playerStats.marineHits + playerStats.marineOnosHits) / (playerStats.marineHits + playerStats.marineOnosHits + playerStats.marineMisses) * 100;
    const alienAccuracy = playerStats.alienHits / (playerStats.alienHits + playerStats.alienMisses) * 100;

    const marineKDR = playerStats.marineKills / playerStats.marineDeaths;
    const alienKDR = playerStats.alienKills / playerStats.alienDeaths;
    return (
        <Grid sx={{ width: '20em',
        flexDirection: 'column', alignItems: 'flex-start' }}>
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
                marineValue={`${marineAccuracy.toFixed(2)}%`}
                alienValue={`${alienAccuracy.toFixed(2)}%`}
            />
            <StatBox
                title="Kill Death Ratio"
                totalValue=""
                marineValue={marineKDR.toFixed(2)}
                alienValue={alienKDR.toFixed(2)}
            />
        </Grid>
    )
}

PlayerPerformance.propTypes = {
    playerStats: PropTypes.shape({
        hiveSkill: PropTypes.number,
        hiveSkillMarine: PropTypes.number,
        hiveSkillAlien: PropTypes.number,
        commanderSkill: PropTypes.number,
        commanderSkillMarine: PropTypes.number,
        commanderSkillAlien: PropTypes.number,
        marineHits: PropTypes.number,
        marineOnosHits: PropTypes.number,
        marineMisses: PropTypes.number,
        alienHits: PropTypes.number,
        alienMisses: PropTypes.number,
        marineKills: PropTypes.number,
        marineDeaths: PropTypes.number,
        alienKills: PropTypes.number,
        alienDeaths: PropTypes.number
    }).isRequired
};

export default PlayerPerformance;
