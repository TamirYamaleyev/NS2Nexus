import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SecondaryStatBox = ({ title, value, side }) => {
    const valueColor = side === 'alien' ? 'orange' : 'lightBlue';
    return (
        <div>
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                rowSpacing={0}
                columnSpacing={0}
            >
                <Grid item>
                    <Box
                        sx={{
                            width: '54px',
                            padding: '1vh',
                            bgcolor: '#3d2e63',
                            borderTopLeftRadius: '.5em',
                            borderBottomLeftRadius: '.5em'
                        }}
                    >
                        <Typography align="center" variant="subtitle2" color={valueColor}>{value}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            width: '260px',
                            padding: '1vh',
                            bgcolor: '#594d75',
                            borderTopRightRadius: '.5em',
                            borderBottomRightRadius: '.5em'
                        }}
                    >
                        <Typography variant="subtitle2" color='#f3f4f6'>{title}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

SecondaryStatBox.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    side: PropTypes.string,
};

export default SecondaryStatBox;
