import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlayerInfo from "./PlayerInfo";
import PlayerPerformance from "./PlayerPerformance";
import PlayerStats from "./PlayerStats";
import RoundList from "./RoundList";

export default function PlayerPage() {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const [playerStats, setPlayerStats] = useState(null);
    const [classPlaytime, setClassPlaytime] = useState([]);
    const [dropDownOpen, setDropDown] = useState(false);

    const toggleDropdown = () => {
        setDropDown(!dropDownOpen);
    }

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

    if (!player || !playerStats) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <PlayerInfo player={player} toggleDropdown={toggleDropdown} dropDownOpen={dropDownOpen} />
                <hr />
                <div>
                    <PlayerPerformance playerStats={playerStats} />
                    <PlayerStats playerStats={playerStats} />
                </div>
                <RoundList />
            </div>
        </div>
    );
}
