import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const LinkButton = ({ to, children }) => {
    return (
        <Button
            component={Link}
            to={to}
            variant="text"
            sx={{
                color: '#F0A968',
                textTransform: 'none',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'none',
                },
            }}
        >
            {children}
        </Button>
    );
};

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default LinkButton;
