using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Interfaces
{
    public interface IRoundLogic
    {
        RoundInfo CreateRound(RoundInfo newRound);
        RoundPlayerStats CreateRoundPlayerStats(RoundPlayerStats newRoundPlayerStats);
        IEnumerable<RoundInfo> GetAllRounds();
        IEnumerable<RoundPlayerStats> GetAlPlayerStatsInRound(int roundId);
        RoundInfo GetRoundById(int roundId);
        RoundPlayerStats GetRoundPlayerStatsById(int roundId, int playerId);
        IEnumerable<KillFeed> GetKillFeedsInRound(int roundId);
        KillFeed GetKillFeedById(int id);
        KillFeed CreateKillFeed(KillFeed killFeed);
    }
}