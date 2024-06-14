import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinkButton from '../../Layout/LinkButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip'; // Import Chip component from MUI
import useTimeType from '../Hooks/useTimeType';
import useFormatTimeLength from '../Hooks/useFormatTimeLength';
import useTeamPlayed from '../Hooks/useTeamPlayed'; // Import the custom hook

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

const RoundList = ({ rounds, roundPlayerStats }) => {
    if (!rounds) {
        return null; // or handle the case where rounds is undefined or null
    }

    const getTeamPlayed = (roundId, teamNumber) => {
        return useTeamPlayed(roundPlayerStats, roundId, teamNumber);
    };

    const determineWinLossStatus = (round, teamPlayed) => {
        if (!round.winningSide) {
            return 'No Result';
        }

        const winningTeam = round.winningSide === 1 ? 'Marines' : 'Aliens';
        const playedTeam = teamPlayed === 1 ? 'Marines' : 'Aliens';

        return winningTeam === playedTeam ? 'Win' : 'Loss';
    };

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
                Recent rounds
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: '10px', backgroundColor: 'transparent' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>WHEN</StyledTableCell>
                            <StyledTableCell>SERVER</StyledTableCell>
                            <StyledTableCell>MAP</StyledTableCell>
                            <StyledTableCell>GAME LENGTH</StyledTableCell>
                            <StyledTableCell>TEAM</StyledTableCell>
                            <StyledTableCell>STATUS</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: '#3D2E63' }}>
                        {rounds.map((round, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {useTimeType(round.roundDate, 'timeAgo')}
                                </StyledTableCell>
                                <StyledTableCell>{round.serverName}</StyledTableCell>
                                <StyledTableCell>{round.map}</StyledTableCell>
                                <StyledTableCell>{useFormatTimeLength(round.roundLength)}</StyledTableCell>
                                <StyledTableCell>{getTeamPlayed(round.id, 1) > getTeamPlayed(round.id, 2) ? 'Marines' : 'Aliens'}</StyledTableCell>
                                <StyledTableCell>
                                    <Chip
                                        label={determineWinLossStatus(round, getTeamPlayed(round.id, round.winningSide))}
                                        sx={{
                                            backgroundColor: determineWinLossStatus(round, getTeamPlayed(round.id, round.winningSide)) === 'Win' ? '#dcfce7' : '#fce7f3',
                                            color: determineWinLossStatus(round, getTeamPlayed(round.id, round.winningSide)) === 'Win' ? '#166534' : '#9d174d',
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <LinkButton to={`/round/${round.id}`}> Details </LinkButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

RoundList.propTypes = {
    rounds: PropTypes.arrayOf(PropTypes.shape({
        roundDate: PropTypes.number.isRequired,
        serverName: PropTypes.string.isRequired,
        map: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
        roundLength: PropTypes.number.isRequired,
        winningSide: PropTypes.number,
        playedStatus: PropTypes.bool,
    })).isRequired,
    roundPlayerStats: PropTypes.array.isRequired,
};

export default RoundList;
