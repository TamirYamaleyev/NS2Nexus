using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Interfaces
{
    public interface IPlayerLogic
    {
        ClassPlaytime CreateClassPlaytime(ClassPlaytime newPlaytime);
        Player EditPlayer(Player editedPlayer);
        PlayerStats EditPlayerStats(int playerId, PlayerStats editedPlayerStats);
        ClassPlaytime EditClassPlaytime(ClassPlaytime editedPlaytime);
        IEnumerable<Player> GetAllPlayers();
        IEnumerable<Player> GetPlayersByRPS(int id);
        IEnumerable<PlayerStats> GetAllPlayerStats();
        IEnumerable<ClassPlaytime> GetClassPlaytimeById(int playerId);
        Player GetPlayerById(int playerId);
        Player GetPlayerBySteamId(int steamId);
        PlayerStats GetPlayerStatsById(int playerId);
        IEnumerable<RoundPlayerStats> GetAllStatsByPlayer(int playerId);
        IEnumerable<RoundPlayerStats> GetAllStatsInRound(int roundId);
        RoundPlayerStats GetRoundPlayerStats(int roundId, int playerId);
    }
}