import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#2c1f4d',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#f3f4f6'
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#4f3d78'
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function RoundPage() {

    const { roundId } = useParams();
    const [round, setRound] = useState(null);
    const [roundPlayerStats, setRoundPlayerStats] = useState([]);
    const [players, setPlayers] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roundResponse = await axios.get(`https://localhost:7105/api/rounds/${roundId}`);
                setRound(roundResponse.data);

                const rpsResponse = await axios.get(`https://localhost:7105/api/rps/round/${roundId}`);
                setRoundPlayerStats(rpsResponse.data);
            } catch (error) {
                console.error(`Error fetching round with ID ${roundId}:`, error);
            }
        };

        fetchData();
    }, [roundId]);

    useEffect(() => {
        const fetchPlayersData = async () => {
            if (roundPlayerStats.length > 0) {
                try {
                    const playersPromises = roundPlayerStats.map(async (rps) => {
                        const playerResponse = await axios.get(`https://localhost:7105/api/players/rps/${rps.id}`);
                        return playerResponse.data;
                    });

                    const playersData = await Promise.all(playersPromises);
                    setPlayers(playersData.flat());
                } catch (error) {
                    console.error(`Error fetching players data:`, error);
                }
            }
        };

        fetchPlayersData();
    }, [roundPlayerStats]);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const playerStatsPromises = roundPlayerStats.map(async (rps) => {
                    const statsResponse = await axios.get(`https://localhost:7105/api/stats/${rps.id}`);
                    return statsResponse.data;
                });

                const playerStatsData = await Promise.all(playerStatsPromises);
                setStats(playerStatsData.flat());
            } catch (error) {
                console.error(`Error fetching player stats:`, error);
            }
        };

        fetchPlayerStats();
    }, [roundPlayerStats]);

    if (!round || !roundPlayerStats || players.length === 0) {
        return <Typography>Loading...</Typography>;
    }

    const marineRPS = roundPlayerStats.filter(p => p.teamNumber === 1);
    const alienRPS = roundPlayerStats.filter(p => p.teamNumber === 2);

    const marinePlayers = marineRPS.map(p => p.id);
    const alienPlayers = alienRPS.map(p => p.id);

    const getPlayerStats = (playerId) => {
        const pStats = stats.find(s => s.playerId === playerId)
        return pStats || {};
    };

    return (
        <Grid sx={{ padding: '3em' }}>
            <Grid align="center">
                <Typography>
                    {(
                        <>
                            Played at:<br />
                            {format(new Date(round.roundDate * 1000), 'h:mm a')}<br />
                            {format(new Date(round.roundDate * 1000), 'dd-MM-yyyy')} (UTC)
                        </>
                    )}
                </Typography>

            </Grid>

            <Grid align="center">
                <Typography
                    component="p"
                    align="center"
                    marginTop="1em"
                    sx={{
                        fontWeight: 400,
                        backgroundColor: '#93c5fd',
                        fontSize: '24px',
                        fontFamily: 'roboto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block',
                    }}
                >
                    Marines

                </Typography>

                <Typography variant="p" component="div" sx={{ marginBottom: '2.5em' }}>
                    {round.winningSide === 1 ? 'Winner' : ''}
                </Typography>
            </Grid>

            <TableContainer component={Paper} sx={{ borderRadius: '10px', backgroundColor: '#2C1F4D' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Player</StyledTableCell>
                            <StyledTableCell>Score</StyledTableCell>
                            <StyledTableCell>K/A/D</StyledTableCell>
                            <StyledTableCell>Acc</StyledTableCell>
                            <StyledTableCell>Structure Dmg</StyledTableCell>
                            <StyledTableCell>Player Dmg</StyledTableCell>
                            <StyledTableCell>Time Played</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: '#3D2E63'}}>
                        {marineRPS.map((player, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{players.find(p => p.id === player.id)?.playerName}</StyledTableCell>
                                <StyledTableCell>{player.score}</StyledTableCell>
                                <StyledTableCell>{`${player.kills}/${player.assists}/${player.deaths}`}</StyledTableCell>
                                <StyledTableCell>
                                    {getPlayerStats(player.id) ? (
                                        `${((getPlayerStats(player.id).marineHits + getPlayerStats(player.id).marineOnosHits) /
                                            (getPlayerStats(player.id).marineHits + getPlayerStats(player.id).marineOnosHits + getPlayerStats(player.id).marineMisses) * 100).toFixed(2)}%`
                                    ) : (
                                        'N/A'
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>{Math.round(player.structureDamage).toLocaleString()}</StyledTableCell>
                                <StyledTableCell>{Math.round(player.playerDamage).toLocaleString()}</StyledTableCell>
                                <StyledTableCell>
                                    {player.timePlayed >= 3600
                                        ? format(new Date(player.timePlayed * 1000), 'HH:mm:ss')
                                        : format(new Date(player.timePlayed * 1000), 'mm:ss')}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid align="center">
                <Typography
                    component="p"
                    align="center"
                    marginTop="1em"
                    sx={{
                        fontWeight: 400,
                        backgroundColor: '#fb923c',
                        fontSize: '24px',
                        fontFamily: 'roboto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block',
                    }}
                >
                    Aliens
                </Typography>

                <Typography variant="p" component="div" sx={{ marginBottom: '2.5em' }}>
                    {round.winningSide === 2 ? 'Winner' : ''}
                </Typography>
            </Grid>

            <TableContainer component={Paper} sx={{ borderRadius: '10px', backgroundColor: '#2C1F4D' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Player</StyledTableCell>
                            <StyledTableCell>Score</StyledTableCell>
                            <StyledTableCell>K/A/D</StyledTableCell>
                            <StyledTableCell>Acc</StyledTableCell>
                            <StyledTableCell>Structure Dmg</StyledTableCell>
                            <StyledTableCell>Player Dmg</StyledTableCell>
                            <StyledTableCell>Time Played</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alienRPS.map((player, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{players.find(p => p.id === player.id)?.playerName}</StyledTableCell>
                                <StyledTableCell>{player.score}</StyledTableCell>
                                <StyledTableCell>{`${player.kills}/${player.assists}/${player.deaths}`}</StyledTableCell>
                                <StyledTableCell>
                                    {getPlayerStats(player.id) ? (
                                        `${((getPlayerStats(player.id).alienHits) /
                                            (getPlayerStats(player.id).alienHits + getPlayerStats(player.id).alienMisses) * 100).toFixed(2)}%`
                                    ) : (
                                        'N/A'
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>{Math.round(player.structureDamage).toLocaleString()}</StyledTableCell>
                                <StyledTableCell>{Math.round(player.playerDamage).toLocaleString()}</StyledTableCell>
                                <StyledTableCell>
                                    {player.timePlayed >= 3600
                                        ? format(new Date(player.timePlayed * 1000), 'HH:mm:ss')
                                        : format(new Date(player.timePlayed * 1000), 'mm:ss')}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

RoundPage.propTypes = {
    round: PropTypes.shape({
        winningSide: PropTypes.number.isRequired,
    }),
    marinePlayers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        kills: PropTypes.number.isRequired,
        assists: PropTypes.number.isRequired,
        deaths: PropTypes.number.isRequired,
        accuracy: PropTypes.string.isRequired,
        structureDamage: PropTypes.number.isRequired,
        playerDamage: PropTypes.number.isRequired,
        timePlayed: PropTypes.number.isRequired,
    })),
    alienPlayers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        kills: PropTypes.number.isRequired,
        assists: PropTypes.number.isRequired,
        deaths: PropTypes.number.isRequired,
        accuracy: PropTypes.string.isRequired,
        structureDamage: PropTypes.number.isRequired,
        playerDamage: PropTypes.number.isRequired,
        timePlayed: PropTypes.number.isRequired,
    })),
};


