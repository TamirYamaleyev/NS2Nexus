import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StatBox = ({ title, totalValue, marineValue, alienValue }) => {
    return (
        <Box sx={{ backgroundColor: '#141414', padding: '1.2em 2em', borderRadius: '.5rem', marginBottom: '1vw', width: '100%', maxWidth: '400px', border: '2px solid #FB923C' }}>
            <Typography sx={{ color: 'white', padding: '.3em 0', margin: 0, fontWeight: 'bold', textAlign: 'left', fontSize: '0.8em' }}>{title}</Typography>
            <Typography sx={{ margin: 0, textAlign: 'left' }}>
                <span className="statBox_value" style={{ color: '#F3F4F6', fontSize: '1.5em' }}>{totalValue}</span> { totalValue && <span style={{ fontSize: '1.4em' }}>/&nbsp;</span> }
                <span className="statBox_value" style={{ color: '#8CC5FD', fontSize: '1.5em' }}>{marineValue}</span> <span style={{ fontSize: '1.4em' }}>/&nbsp;</span>
                <span className="statBox_value" style={{ color: '#FB923C', fontSize: '1.5em' }}>{alienValue}</span>
            </Typography>
        </Box>
    );

};



StatBox.propTypes = {
    title: PropTypes.string.isRequired,
    totalValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marineValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    alienValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default StatBox;
