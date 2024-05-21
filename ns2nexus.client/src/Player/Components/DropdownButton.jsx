import PropTypes from 'prop-types';

const DropdownButton = ({ name, iconSrc, link, iconHeight, iconWidth }) => {
    const handleClick = () => {
        window.open(link, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: '400',
                fontSize: '16px',
                color: '#121827',
                width: '100%',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '8px 50px 10px 30px',
            }}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '15% 85%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <img
                        src={iconSrc}
                        alt={`${name} Icon`}
                        style={{ marginRight: '10px', height: iconHeight, width: iconWidth }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>{name}</div>
            </div>





        </button>
    );
};

DropdownButton.propTypes = {
    name: PropTypes.string.isRequired,
    iconSrc: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    iconHeight: PropTypes.string,
    iconWidth: PropTypes.string
};

export default DropdownButton;
