import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useFormatTimeLength from '../Player/Hooks/useFormatTimeLength'; // Assuming you have this hook

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

const RoundPage = ({ round, marinePlayers, alienPlayers }) => {
    return (
        <>
            <Typography
                component="p"
                align="left"
                marginBottom=".5em"
                sx={{
                    fontWeight: 700,
                    color: '#f3f4f6',
                    fontSize: '30px',
                    fontFamily: 'roboto',
                    background: 'linear-gradient(90deg, #F0A968, #9B3613)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                }}
            >
                Round Details
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: '10px', backgroundColor: 'transparent', marginBottom: '20px' }}>
                <Typography variant="h6" component="div" sx={{ marginBottom: '10px', color: '#F0A968' }}>
                    Marines - {round.winningSide === 1 ? 'Won' : 'Lost'}
                </Typography>
                <Table sx={{ minWidth: 700 }} aria-label="marine-table">
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
                        {marinePlayers.map((player, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{player.name}</StyledTableCell>
                                <StyledTableCell>{player.score}</StyledTableCell>
                                <StyledTableCell>{`${player.kills}/${player.assists}/${player.deaths}`}</StyledTableCell>
                                <StyledTableCell>{player.accuracy}</StyledTableCell>
                                <StyledTableCell>{player.structureDamage}</StyledTableCell>
                                <StyledTableCell>{player.playerDamage}</StyledTableCell>
                                <StyledTableCell>{useFormatTimeLength(player.timePlayed)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        {/* Total and Average Rows */}
                        <StyledTableRow>
                            <StyledTableCell><strong>Total</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total score */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total K/A/D */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average accuracy */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total structure damage */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total player damage */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total time played */}</strong></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell><strong>Average</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average score */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average K/A/D */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average accuracy */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average structure damage */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average player damage */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average time played */}</strong></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper} sx={{ borderRadius: '10px', backgroundColor: 'transparent' }}>
                <Typography variant="h6" component="div" sx={{ marginBottom: '10px', color: '#F0A968' }}>
                    Aliens - {round.winningSide === 2 ? 'Won' : 'Lost'}
                </Typography>
                <Table sx={{ minWidth: 700 }} aria-label="alien-table">
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
                        {alienPlayers.map((player, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{player.name}</StyledTableCell>
                                <StyledTableCell>{player.score}</StyledTableCell>
                                <StyledTableCell>{`${player.kills}/${player.assists}/${player.deaths}`}</StyledTableCell>
                                <StyledTableCell>{player.accuracy}</StyledTableCell>
                                <StyledTableCell>{player.structureDamage}</StyledTableCell>
                                <StyledTableCell>{player.playerDamage}</StyledTableCell>
                                <StyledTableCell>{useFormatTimeLength(player.timePlayed)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        {/* Total and Average Rows */}
                        <StyledTableRow>
                            <StyledTableCell><strong>Total</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total score */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total K/A/D */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average accuracy */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total structure damage */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total player damage */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate total time played */}</strong></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell><strong>Average</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average score */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average K/A/D */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average accuracy */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average structure damage */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average player damage */}</strong></StyledTableCell>
                            <StyledTableCell><strong>{/* Calculate average time played */}</strong></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

RoundPage.propTypes = {
    round: PropTypes.shape({
        winningSide: PropTypes.number.isRequired,
    }).isRequired,
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
    })).isRequired,
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
    })).isRequired,
};

export default RoundPage;
