using Microsoft.AspNetCore.Mvc;
using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class PlayersController : Controller
    {
        private IPlayerLogic _playerLogic;
        public PlayersController(IPlayerLogic playerLogic)
        {
            _playerLogic = playerLogic;
        }

        [HttpGet("Players")]
        public IEnumerable<Player> GetPlayers()
        {
            IEnumerable<Player> players = _playerLogic.GetAllPlayers();
            return players;
        }

        [HttpGet("Players/{id}")]
        public Player GetPlayer(int id)
        {
            Player player = _playerLogic.GetPlayerById(id);
            return player;
        }

        [HttpGet("Players/steamid/{steamId}")]
        public Player GetPlayerBySteamId(int steamId)
        {
            Player player = _playerLogic.GetPlayerBySteamId(steamId);
            return player;
        }

        [HttpPut("Players")]
        public Player EditPlayer([FromBody] Player updatedPlayer)
        {
            Player playerToUpdate = _playerLogic.EditPlayer(updatedPlayer);
            return playerToUpdate;
        }

        // <------------ STATS ------------> //

        [HttpGet("Stats/{id}")]
        public PlayerStats GetStats(int id)
        {
            PlayerStats playerStats = _playerLogic.GetPlayerStatsById(id);
            return playerStats;
        }

        [HttpPut("Stats/{id}")]
        public PlayerStats EditStats([FromBody] PlayerStats updatedStats, int id)
        {
            PlayerStats statsToUpdate = _playerLogic.EditPlayerStats(updatedStats.PlayerId, updatedStats);
            return statsToUpdate;
        }

        // <------------ ROUND PLAYER STATS ------------> //

        [HttpGet("Rps/{id}")]
        public IEnumerable<RoundPlayerStats> GetRoundPlayerStats(int id)
        {
            IEnumerable<RoundPlayerStats> rps = _playerLogic.GetAllStatsByPlayer(id);
            return rps;
        }

        //[HttpPost("RoundPlayerStats")]
        //public RoundPlayerStats CreateRoundPlayerStats(RoundPlayerStats newRps)
        //{
        //    RoundPlayerStats rps = _playerLogic.CreateRoundPlayerStats(newRps);
        //    return rps;
        //}

        // <------------ CLASS PLAYTIME ------------> //

        [HttpGet("Playtime/{id}")]
        public IEnumerable<ClassPlaytime> GetPlaytimes(int id)
        {
            IEnumerable<ClassPlaytime> playtimes = _playerLogic.GetClassPlaytimeById(id);
            return playtimes;
        }

        [HttpPost("Playtime")]
        public ClassPlaytime CreatePlaytime([FromBody] ClassPlaytime newPlaytime)
        {
            ClassPlaytime playtime = _playerLogic.CreateClassPlaytime(newPlaytime);
            return playtime;
        }

        [HttpPut("Playtime/{id}")]
        public ClassPlaytime EditClassPlaytime([FromBody] ClassPlaytime updatedPlaytime, int id)
        {
            ClassPlaytime playtimeToUpdate = _playerLogic.EditClassPlaytime(updatedPlaytime);
            return playtimeToUpdate;
        }
    }
}
