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

        [HttpPost("Players")]
        public Player CreatePlayer([FromBody] Player newPlayer)
        {
            Player player = _playerLogic.CreatePlayer(newPlayer);
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

        [HttpPost("Stats")]
        public PlayerStats CreateStats([FromBody] PlayerStats newStats)
        {
            PlayerStats stats = _playerLogic.CreatePlayerStats(newStats);
            return stats;
        }

        [HttpPut("Stats/{id}")]
        public PlayerStats EditStats([FromBody] PlayerStats updatedStats, int id)
        {
            PlayerStats statsToUpdate = _playerLogic.EditPlayerStats(updatedStats.PlayerId, updatedStats);
            return statsToUpdate;
        }

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
