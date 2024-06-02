import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlayerInfo from "./PageParts/PlayerInfo";
import PlayerPerformance from "./PageParts/PlayerPerformance";
import PlayerStats from "./PageParts/PlayerStats";
import RoundList from "./PageParts/RoundList";

export default function PlayerPage() {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const [playerStats, setPlayerStats] = useState(null);
    const [classPlaytime, setClassPlaytime] = useState([]);
    const [roundPlayerStats, setRoundPlayerStats] = useState([{}]);
    const [rounds, setRounds] = useState([{}]);
    const [dropDownOpen, setDropDown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropDown(!dropDownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropDown(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playerResponse = await axios.get(`https://localhost:7105/api/players/steamid/${playerId}`);
                setPlayer(playerResponse.data);

                const statsResponse = await axios.get(`https://localhost:7105/api/stats/${playerResponse.data.id}`);
                setPlayerStats(statsResponse.data);

                const classPlaytimeResponse = await axios.get(`https://localhost:7105/api/playtime/${playerResponse.data.id}`);
                setClassPlaytime(classPlaytimeResponse.data);

                const rpsResponse = await axios.get(`https://localhost:7105/api/roundPlayerStats/${playerResponse.data.id}`);
                setRoundPlayerStats(rpsResponse.data);

                const roundResponse = await axios.get(`https://localhost:7105/api/rounds/player/${playerResponse.data.id}`); 
                setRounds(roundResponse.data);
            } catch (error) {
                console.error(`Error fetching player with ID ${playerId}:`, error);
            }
        };

        fetchData();
    }, [playerId]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    if (!player || !playerStats || !rounds) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            position: 'absolute',
            top: '100px',
            left: '100px',
            width: 'calc(100% - 200px)',
            zIndex: '1',
            color: 'silver',
            padding: '20px',
            borderRadius: '15px',
        }}>
            <PlayerInfo
                player={player}
                toggleDropdown={toggleDropdown}
                dropDownOpen={dropDownOpen}
                dropdownRef={dropdownRef}
            />
            <hr style={{ border: '1px solid silver', margin: '20px 0' }} />
            <div>
                <PlayerPerformance playerStats={playerStats} />
                <PlayerStats playerStats={roundPlayerStats} playerRounds={rounds.$values} playerClassPlaytime={classPlaytime.$values} />
            </div>
            <RoundList />
        </div>
    );

}
