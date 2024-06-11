import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useTimeType from '../Hooks/useTimeType';
import useFormatTimeLength from '../Hooks/useFormatTimeLength';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#141414',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const RoundList = ({ rounds }) => {
    if (!rounds) {
        return null; // or handle the case where rounds is undefined or null
    }

    return (
        <>
            <p style={{ textAlign: 'left' }}>
                <span style={{
                    background: `linear-gradient(90deg, #F0A968, #9B3613)`,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: '700',
                    fontSize: '38px'
                }}>Recent rounds</span>
            </p>

            <TableContainer component={Paper}>
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
                    <TableBody>
                        {rounds.map((round, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {useTimeType(round.roundDate, 'timeAgo')}
                                </StyledTableCell>
                                <StyledTableCell>{round.serverName}</StyledTableCell>
                                <StyledTableCell>{round.map && round.map.id}</StyledTableCell>
                                <StyledTableCell>{useFormatTimeLength(round.roundLength)}</StyledTableCell>
                                <StyledTableCell>{/* Team */}</StyledTableCell>
                                <StyledTableCell>{/* Status */}</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
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
};

export default RoundList;
