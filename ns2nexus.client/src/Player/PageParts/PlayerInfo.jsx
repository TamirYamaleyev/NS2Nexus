import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import DropdownButton from '../Components/DropdownButton';

function PlayerInfo({ player, toggleDropdown, dropDownOpen, dropdownRef }) {
    return (
        <div
            style={{
                position: 'relative',
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: '#141414',
                borderRadius: '15px',
            }}
        >
            {player.profilePictureUrl && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '150px', marginRight: '10px' }}>
                        <img src={player.profilePictureUrl} alt={player.name} style={{ width: '100%', border: '5px solid white', borderRadius: '5%' }} />
                    </div>
                    <div>
                        <p style={{ margin: 20 }}>
                            <span style={{
                                background: `linear-gradient(90deg, #F0A968, #9B3613)`,
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                fontWeight: '700',
                                fontSize: '38px'
                            }}>{player.playerName}</span>
                        </p>
                    </div>
                </div>
            )}

            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <div ref={dropdownRef} style={{ width: '4rem', height: '4rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '2rem', height: '2rem', borderRadius: '50%', background: 'white' }}>
                        <IconButton onClick={toggleDropdown} style={{ padding: '0', background: 'none', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <MoreVertIcon fontSize="medium" style={{ color: 'gray' }} />
                        </IconButton>
                    </div>
                </div>

                {/* Dropdown Content */}
                <Fade in={dropDownOpen} timeout={150}>
                    <div
                        style={{
                            position: 'absolute',
                            top: 'calc(85%)',
                            right: 15,
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '5px',
                            zIndex: 1000,
                            whiteSpace: 'nowrap', // Ensure each button takes up only one line
                        }}
                    >
                        <DropdownButton
                            name="View Steam Profile"
                            iconSrc="/assets/steam_icon.png"
                            link={`https://steamcommunity.com/profiles/${BigInt(player.steamId) + BigInt(76561197960265728)}`}
                            iconHeight='1em'
                        />
                        <DropdownButton
                            name="View NSL Profile"
                            iconSrc="/assets/nsl_icon.png"
                            link={`https://www.ensl.org/users/8018`}
                            iconHeight='1.2em'
                        />
                    </div>
                </Fade>
            </div>
        </div>
    );
}

PlayerInfo.propTypes = {
    player: PropTypes.object.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    dropDownOpen: PropTypes.bool.isRequired,
    dropdownRef: PropTypes.object.isRequired,
};

export default PlayerInfo;
