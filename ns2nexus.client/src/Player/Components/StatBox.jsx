import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StatBox = ({ title, totalValue, marineValue, alienValue }) => {
    return (
        <Box sx={{ backgroundColor: '#382d52', padding: '1.2em 2em', borderRadius: '.5rem', marginBottom: '.5em', width: '100%', maxWidth: '400px', border: '0px solid #FB923C' }}>
            <Typography sx={{ color: '#f3f4f6', padding: '.3em 0', margin: 0, fontWeight: '400', textAlign: 'left', fontSize: '14px' }}>{title}</Typography>
            <Typography sx={{ margin: 0, textAlign: 'left'}}>
                <span className="statBox_value" style={{ color: '#f3f4f6', fontSize: '24px' }}>{totalValue}</span> { totalValue && <span style={{ fontSize: '1.4em' }}>/&nbsp;</span> }
                <span className="statBox_value" style={{ color: '#8CC5FD', fontSize: '24px' }}>{marineValue}</span> <span style={{ fontSize: '1.4em' }}>/&nbsp;</span>
                <span className="statBox_value" style={{ color: '#FB923C', fontSize: '24px' }}>{alienValue}</span>
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
