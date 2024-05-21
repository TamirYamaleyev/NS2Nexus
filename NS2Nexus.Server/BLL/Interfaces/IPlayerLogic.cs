using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Interfaces
{
    public interface IPlayerLogic
    {
        ClassPlaytime CreateClassPlaytime(ClassPlaytime newPlaytime);
        Player CreatePlayer(Player newPlayer);
        PlayerStats CreatePlayerStats(PlayerStats newPlayerStats);
        Player EditPlayer(Player editedPlayer);
        PlayerStats EditPlayerStats(int playerId, PlayerStats editedPlayerStats);
        ClassPlaytime EditClassPlaytime(ClassPlaytime editedPlaytime);
        IEnumerable<Player> GetAllPlayers();
        IEnumerable<PlayerStats> GetAllPlayerStats();
        IEnumerable<ClassPlaytime> GetClassPlaytimeById(int playerId);
        Player GetPlayerById(int playerId);
        Player GetPlayerBySteamId(int steamId);
        PlayerStats GetPlayerStatsById(int playerId);
    }
}