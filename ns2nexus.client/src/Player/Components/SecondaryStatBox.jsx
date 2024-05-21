import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey, blueGrey } from '@mui/material/colors';

const SecondaryStatBox = ({ title, value, side }) => {
    const valueColor = side === 'alien' ? 'orange' : 'lightBlue';
    return (
        //<div style={{ backgroundColor: '#141414', padding: '1vw 2vw', borderRadius: '.5rem', marginBottom: '1vw', width: '100%', maxWidth: '400px', border: '2px solid #FB923C' }}>
        //    <p style={{ color: 'white', margin: 0, fontWeight: 'bold', textAlign: 'left', fontSize: '0.8em' }}>{title}:</p>
        //    <p style={{ margin: 0, textAlign: 'left' }}>
        //        <span className="statBox_value" style={{ color: '#F3F4F6', fontSize: '1.5em' }}>{totalValue}</span> {totalValue && <span style={{ fontSize: '1.4em' }}>/&nbsp;</span>}
        //        <span className="statBox_value" style={{ color: '#8CC5FD', fontSize: '1.5em' }}>{marineValue}</span> <span style={{ fontSize: '1.4em' }}>/&nbsp;</span>
        //        <span className="statBox_value" style={{ color: '#FB923C', fontSize: '1.5em' }}>{alienValue}</span>
        //    </p>

        //</div>

        <div>
            <Grid
                container spacing={0}
                width="34vw"
                direction="row"
                height="2.6em"
                alignItems="center"
                justifyContent="flex-start"

            >
                <Box
                    alignItems="center"
                    padding=".5em 1.3em"
                    sx={{
                        bgcolor: blueGrey[900],
                        borderTopLeftRadius: '.5em',
                        borderBottomLeftRadius: '.5em'
                    }}
                >
                    <Typography color={valueColor}>value</Typography>
                </Box>
                <Box
                    maxheight="1em"
                    alignItems="center"
                    textAlign="left"
                    padding=".5em 1.3em"
                    width="50%"
                    sx={{
                        bgcolor: grey[600],
                        borderTopRightRadius: '.5em',
                        borderBottomRightRadius: '.5em'
                    }}
                >
                    <Typography color='white'>{title}</Typography>
                </Box>
            </Grid>
        </div>
    );
};



SecondaryStatBox.propTypes = {
    title: PropTypes.string.isRequired,
    totalValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marineValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    alienValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SecondaryStatBox;
