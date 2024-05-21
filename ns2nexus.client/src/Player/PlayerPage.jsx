import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StatBox from "./Components/StatBox";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import DropdownButton from './Components/DropdownButton';
import StatBoxHolder from './Components/StatBoxHolder';
import SecondaryStatBox from './Components/SecondaryStatBox';

export default function PlayerPage() {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const [playerStats, setPlayerStats] = useState(null);
    const [classPlaytime, setClassPlaytime] = useState([]);
    const [dropDownOpen, setDropDown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropDown(!dropDownOpen);
    }

    const stats = classPlaytime.map(item => ({
        number: item.playTime,
        title: `Class ${item.classId}`
    }));

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const playerResponse = await axios.get(`https://localhost:7105/api/players/steamid/${playerId}`);
                setPlayer(playerResponse.data);

                const statsResponse = await axios.get(`https://localhost:7105/api/stats/${playerResponse.data.id}`);
                setPlayerStats(statsResponse.data);

                const classPlaytimeResponse = await axios.get(`https://localhost:7105/api/playtime/${playerResponse.data.id}`);
                setClassPlaytime(classPlaytimeResponse.data);
            }
            catch (error) {
                console.error(`Error fetching player with ID ${playerId}:`, error);
            }
        };

        fetchPlayer();
    }, [playerId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropDown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    if (!player || !playerStats) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    top: '100px',
                    left: '100px',
                    width: 'calc(100% - 200px)',
                    zIndex: '1',
                    color: 'silver',
                    padding: '20px',
                    borderRadius: '15px',
                }}
            >
                {/* Profile Section */}
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


                {/* Divider */}
                <hr style={{ border: '1px solid silver', margin: '20px 0' }} />

                {/* Stats Section */}
                <div style={{ width: '60%', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <StatBox
                        title="Skill"
                        totalValue={playerStats.hiveSkill}
                        marineValue={playerStats.hiveSkillMarine}
                        alienValue={playerStats.hiveSkillAlien}
                    />
                    <StatBox
                        title="Commander Skill"
                        totalValue={playerStats.commanderSkill}
                        marineValue={playerStats.commanderSkillMarine}
                        alienValue={playerStats.commanderSkillAlien}
                    />
                    <StatBox
                        title="Accuracy"
                        marineValue={`${playerStats.marineAccuracy}%`}
                        alienValue={`${playerStats.alienAccuracy}%`}
                    />
                    <StatBox
                        title="Kill Death Ratio"
                        totalValue=""
                        marineValue={playerStats.marineKdr}
                        alienValue={playerStats.alienKdr}
                    />
                </div>

                <SecondaryStatBox title={'Score Per Hour (Alien)'} side={'alien'} />

            </div>
        </div>
    );


}