import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlayerInfo from "./PageParts/PlayerInfo";
import PlayerPerformance from "./PageParts/PlayerPerformance";
import PlayerStats from "./PageParts/PlayerStats";
import RoundList from "./PageParts/RoundList";
import Grid from '@mui/material/Grid';

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
                const fetchedPlayer = playerResponse.data;
                setPlayer(fetchedPlayer);

                const statsResponse = await axios.get(`https://localhost:7105/api/stats/${fetchedPlayer.id}`);
                setPlayerStats(statsResponse.data);

                const classPlaytimeResponse = await axios.get(`https://localhost:7105/api/playtime/${fetchedPlayer.id}`);
                setClassPlaytime(classPlaytimeResponse.data);

                const rpsResponse = await axios.get(`https://localhost:7105/api/rps/${fetchedPlayer.id}`);
                setRoundPlayerStats(rpsResponse.data);

                const roundResponse = await axios.get(`https://localhost:7105/api/rounds/player/${fetchedPlayer.id}`);;
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

    if (!player || !playerStats || !rounds || !roundPlayerStats) {
        return <Grid>Loading...</Grid>;
    }

    //console.log(`Player: ${player}\nStats: ${playerStats}\nRPS: ${roundPlayerStats}\nRounds: ${rounds}\nClassPlaytime: ${classPlaytime}\nPlayer Id: ${player.id}`)

    return (
        <Grid sx={{
            margin: '0 auto',
            padding: '3em 5.5em',
            top: '100px',
            left: '100px',
            width: 'calc(100% - 200px)',
            zIndex: '1',
            color: 'silver',
            borderRadius: '15px',
            height: 'auto',
            minHeight:'100%'
        }}>
            <PlayerInfo
                player={player}
                toggleDropdown={toggleDropdown}
                dropDownOpen={dropDownOpen}
                dropdownRef={dropdownRef}
            />

            <hr style={{ border: '1px solid silver', margin: '20px 0' }} />

            <PlayerPerformance playerStats={playerStats} />
            <PlayerStats playerStats={roundPlayerStats} playerRounds={rounds.$values} playerClassPlaytime={classPlaytime.$values} />
            <RoundList rounds={rounds.$values} roundPlayerStats={roundPlayerStats} />
        </Grid>
    );

}
