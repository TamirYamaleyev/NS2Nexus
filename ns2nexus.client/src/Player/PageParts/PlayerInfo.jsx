import PropTypes from 'prop-types';
import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import DropdownButton from '../Components/DropdownButton';

const PlayerInfo = ({ player, toggleDropdown, dropDownOpen }) => {
    const dropdownRef = useRef(null);

    return (
        <div>
            <div>
                {player.profilePictureUrl && (
                    <div>
                        <img src={player.profilePictureUrl} alt={player.name} />
                        <p>
                            <span>{player.playerName}</span>
                        </p>
                    </div>
                )}

                <div>
                    <div ref={dropdownRef}>
                        <IconButton onClick={toggleDropdown}>
                            <MoreVertIcon />
                        </IconButton>
                    </div>

                    <Fade in={dropDownOpen} timeout={150}>
                        <div>
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
        </div>
    );
};

PlayerInfo.propTypes = {
    player: PropTypes.shape({
        profilePictureUrl: PropTypes.string,
        name: PropTypes.string,
        playerName: PropTypes.string,
        steamId: PropTypes.string
    }).isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    dropDownOpen: PropTypes.bool.isRequired
};

export default PlayerInfo;
