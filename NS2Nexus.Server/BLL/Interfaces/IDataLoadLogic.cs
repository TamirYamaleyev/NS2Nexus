using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Interfaces
{
    public interface IDataLoadLogic
    {
        void CreatePlayers(List<Player> playerList);
        void CreatePlayerStats(List<PlayerStats> statsList);
        void CreateRoundPlayerStats(List<RoundPlayerStats> rpsList);
        void CreateRounds(List<RoundInfo> roundList);
        void FlushData();
        void LoadData();
    }
}