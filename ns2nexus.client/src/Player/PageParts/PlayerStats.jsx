import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import SecondaryStatBox from '../Components/SecondaryStatBox';
import { useEffect } from 'react';
import useAverage from '../Hooks/useAverage';
import useWinrate from '../Hooks/useWinrate';

const PlayerStats = ({ playerStats, playerRounds, playerClassPlaytime }) => {

    const mSPH = useAverage(playerStats, 'score', 1, 'hours'); // Team 1 represents Marines
    const aSPH = useAverage(playerStats, 'score', 2, 'hours'); // Team 2 represents Aliens

    const mSDPM = useAverage(playerStats, 'structureDamage', 1, 'minutes'); // Team 1 represents Marines
    const aSDPM = useAverage(playerStats, 'structureDamage', 2, 'minutes'); // Team 2 represents Aliens

    const mPDPM = useAverage(playerStats, 'playerDamage', 1, 'minutes'); // Team 1 represents Marines
    const aPDPM = useAverage(playerStats, 'playerDamage', 2, 'minutes'); // Team 2 represents Aliens

    const mWinrate = useWinrate(playerStats, playerRounds, 1); // Team 1 represents Marines
    const aWinrate = useWinrate(playerStats, playerRounds, 2); // Team 2 represents Aliens

    const getClassText = (classId) => {
        switch (classId) {
            case 0:
                return "Unknown";
            case 1:
                return "Skulk";
            case 2:
                return "Gorge";
            case 3:
                return "Lerk";
            case 4:
                return "Fade";
            case 5:
                return "Onos";
            default:
                return "Unknown";
        }
    };

    useEffect(() => {
        if (!Array.isArray(playerStats) || playerStats.length === 0 || !Array.isArray(playerRounds) || playerRounds.length === 0) {
            console.log('Loading data...');
        }
    }, [playerStats, playerRounds]);

    if (!Array.isArray(playerStats) || playerStats.length === 0 || playerRounds.length === 0 || !Array.isArray(playerRounds)) {
        return <div>No player stats available</div>;
    }

    return (
        <div>
            <Grid container rowSpacing={4} columnSpacing={4}>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox 
                        title="DISCORD"
                        value="ICON"
                        side="marine"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Score Per Hour (Marine)"
                        value={mSPH.toFixed(0).toString()}
                        side="marine"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Score Per Hour (Alien)"
                        value={aSPH.toFixed(0).toString()}
                        side="alien"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Avg. player damage / min (Marine)"
                        value={mPDPM.toFixed(0).toString()}
                        side="marine"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Avg. player damage / min (Alien)"
                        value={aPDPM.toFixed(0).toString()}
                        side="alien"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Avg. structure damage / min (Marine)"
                        value={mSDPM.toFixed(0).toString()}
                        side="marine"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Avg. structure damage / min (Alien)"
                        value={aSDPM.toFixed(0).toString()}
                        side="alien"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Win rate (Marines)"
                        value={mWinrate.winRate.toFixed(1).toString() + "%"}
                        side="marine"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Win rate (Aliens)"
                        value={aWinrate.winRate.toFixed(1).toString() + "%"}
                        side="alien"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Commander win rate (Marines)"
                        value={mWinrate.commandingWinRate.toFixed(1).toString() + "%"}
                        side="marine"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Commander win rate (Aliens)"
                        value={aWinrate.commandingWinRate.toFixed(1).toString() + "%"}
                        side="alien"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SecondaryStatBox
                        title="Main Life Form"
                        value={playerClassPlaytime.length > 0 ? getClassText(playerClassPlaytime[4].classId) : ""}
                        side="alien"
                    />
                </Grid>

                {/*<Grid item xs={12} lg={3}>*/}
                {/*    <SecondaryStatBox*/}
                {/*        title="Total lifeforms killed"*/}
                {/*        value={stats.hits}*/}
                {/*        side="marine"*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} lg={3}>*/}
                {/*    <SecondaryStatBox*/}
                {/*        title="Marine Accuracy"*/}
                {/*        value={stats.hits}*/}
                {/*        side="marine"*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} lg={3}>*/}
                {/*    <SecondaryStatBox*/}
                {/*        title="Alien Accuracy"*/}
                {/*        value={stats.hits}*/}
                {/*        side="alien"*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} lg={3}>*/}
                {/*    <SecondaryStatBox*/}
                {/*        title="Hive Level"*/}
                {/*        value={stats.hits}*/}
                {/*        side="marine"*/}
                {/*    />*/}
                {/*</Grid>*/}
            </Grid>
        </div>
    );
};

PlayerStats.propTypes = {
    playerStats: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            roundId: PropTypes.number.isRequired,
            playerId: PropTypes.number.isRequired,
            teamNumber: PropTypes.number.isRequired,
            hits: PropTypes.number.isRequired,
            score: PropTypes.number.isRequired, // Ensure score is included
            timePlayed: PropTypes.number.isRequired, // Ensure timePlayed is included
            // Add PropTypes for other properties as needed
        })
    ).isRequired,
    playerRounds: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            winningSide: PropTypes.number.isRequired,
            // Add PropTypes for other properties as needed
        })
    ).isRequired,
    playerClassPlaytime: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            roundId: PropTypes.number.isRequired,
            playerId: PropTypes.number.isRequired,
            playTime: PropTypes.number.isRequired,
            classId: PropTypes.number.isRequired,
            // Add PropTypes for other properties as needed
        })
    ).isRequired,
};

PlayerStats.defaultProps = {
    playerStats: [],
    playerRounds: [],
};

export default PlayerStats;
