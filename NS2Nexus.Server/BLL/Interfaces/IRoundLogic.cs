using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Interfaces
{
    public interface IRoundLogic
    {
        KillFeed CreateKillFeed(KillFeed newKillFeed);
        RoundInfo CreateRound(RoundInfo newRound);
        //RoundPlayerStats CreateRoundPlayerStats(RoundPlayerStats newRoundPlayerStats);
        IEnumerable<RoundInfo> GetAllRounds();
        IEnumerable<RoundInfo> GetAllRoundsByPlayerId(int playerId);
        //IEnumerable<RoundPlayerStats> GetAllStatsByPlayer(int playerId);
        //IEnumerable<RoundPlayerStats> GetAllStatsInRound(int roundId);
        KillFeed GetKillFeedById(int id);
        IEnumerable<KillFeed> GetKillFeedsInRound(int roundId);
        RoundInfo GetRoundById(int roundId);
        //RoundPlayerStats GetRoundPlayerStats(int roundId, int playerId);
    }
}