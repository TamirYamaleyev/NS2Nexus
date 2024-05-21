using Microsoft.AspNetCore.Mvc;
using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class RoundsController : Controller
    {
        private IRoundLogic _roundLogic;
        public RoundsController(IRoundLogic roundLogic)
        {
            _roundLogic = roundLogic;
        }

        [HttpGet("Rounds")]
        public IEnumerable<RoundInfo> GetRounds()
        {
            IEnumerable<RoundInfo> rounds = _roundLogic.GetAllRounds();
            return rounds;
        }

        [HttpGet("Rounds/{id}")]
        public RoundInfo GetRound(int id)
        {
            RoundInfo round = _roundLogic.GetRoundById(id);
            return round;
        }

        [HttpPost("Rounds")]
        public RoundInfo CreateRound([FromBody] RoundInfo newRound)
        {
            RoundInfo round = _roundLogic.CreateRound(newRound);
            return round;
        }

        // <------------ ROUND PLAYER STATS ------------> //

        [HttpGet("RoundPlayerStats/{id}")]
        public RoundPlayerStats GetRoundPlayerStats(int roundId, int playerId)
        {
            RoundPlayerStats rps = _roundLogic.GetRoundPlayerStatsById(roundId, playerId);
            return rps;
        }

        [HttpPost("RoundPlayerStats")]
        public RoundPlayerStats CreateRoundPlayerStats(RoundPlayerStats newRps)
        {
            RoundPlayerStats rps = _roundLogic.CreateRoundPlayerStats(newRps);
            return rps;
        }

        // <------------ KILL FEED ------------> //

        [HttpGet("KillFeed/{id}")]
        public KillFeed GetKillFeed(int roundId)
        {
            KillFeed killFeed = _roundLogic.GetKillFeedById(roundId);
            return killFeed;
        }

        [HttpPost("KillFeed")]
        public KillFeed CreateKillFeed(KillFeed newKillFeed)
        {
            KillFeed killFeed = _roundLogic.CreateKillFeed(newKillFeed);
            return killFeed;
        }
    }
}
