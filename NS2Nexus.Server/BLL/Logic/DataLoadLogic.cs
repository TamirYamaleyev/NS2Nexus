using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.DAL.Interfaces;
using NS2Nexus.Server.Helpers;
using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Logic
{
    public class DataLoadLogic : IDataLoadLogic
    {
        private readonly ILogger<PlayerLogic> _logger;

        private readonly IEntityBaseRepository<Player> _playerRepository;
        private readonly IEntityBaseRepository<PlayerStats> _playerStatsRepository;
        private readonly IEntityBaseRepository<ClassPlaytime> _classPlaytimeRepository;
        private readonly IEntityBaseRepository<RoundPlayerStats> _roundPlayerStatsRepository;
        private readonly IEntityBaseRepository<RoundInfo> _roundRepository;

        public DataLoadLogic(ILogger<PlayerLogic> logger, IEntityBaseRepository<Player> playerRepository, IEntityBaseRepository<PlayerStats> playerStatsRepository, IEntityBaseRepository<ClassPlaytime> classPlaytimeRepository, IEntityBaseRepository<RoundPlayerStats> roundPlayerStatsRepository, IEntityBaseRepository<RoundInfo> roundRepository)
        {
            _logger = logger;
            _playerRepository = playerRepository;
            _playerStatsRepository = playerStatsRepository;
            _classPlaytimeRepository = classPlaytimeRepository;
            _roundPlayerStatsRepository = roundPlayerStatsRepository;
            _roundRepository = roundRepository;
        }

        public void FlushData()
        {
            // Disable all constraints
            _roundPlayerStatsRepository.ExecuteSqlCommand("EXEC sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'");

            // Delete data from all tables
            _roundPlayerStatsRepository.ExecuteSqlCommand("EXEC sp_MSForEachTable 'DELETE FROM ?'");

            // Reset identity seed for 'roundPlayerStats' table
            _roundPlayerStatsRepository.ExecuteSqlCommand("DBCC CHECKIDENT('roundPlayerStats', RESEED, 0)");

            // Enable all constraints
            _roundPlayerStatsRepository.ExecuteSqlCommand("EXEC sp_MSForEachTable 'ALTER TABLE ? CHECK CONSTRAINT ALL'");
        }

        public void LoadData()
        {
            var (playerList, statsList, rpsList, roundList) = RoundParseHelper.ParseFiles();

            // Step 1: Create Players
            CreatePlayers(playerList);

            // Step 2: Create PlayerStats
            CreatePlayerStats(statsList);

            // Step 3: Create Rounds
            CreateRounds(roundList);

            // Step 4: Create RoundPlayerStats
            CreateRoundPlayerStats(rpsList);
        }
        public void CreatePlayers(List<Player> playerList)
        {
            try
            {
                if (playerList.Count != playerList.Select(p => p.Id).Distinct().Count())
                {
                    throw new Exception("Player list error: Identical Player Ids found.");
                }
                foreach (var newPlayer in playerList)
                {
                    _playerRepository.Add(newPlayer);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create Player. Please try again later.");
            }
        }
        public void CreatePlayerStats(List<PlayerStats> statsList)
        {
            try
            {
                if (statsList.Count != statsList.Select(s => s.Id).Distinct().Count())
                {
                    throw new Exception("Player Stats list error: Identical Player Stats Ids found.");
                }
                foreach (var newStats in statsList)
                {
                    _playerStatsRepository.Add(newStats);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create Player Stats. Please try again later.");
            }
        }
        public void CreateRounds(List<RoundInfo> roundList)
        {
            try
            {
                if (roundList.Count != roundList.Select(r => r.Id).Distinct().Count())
                {
                    throw new Exception("Round list error: Identical Round Ids found.");
                }
                foreach (var newRound in roundList)
                {
                    _roundRepository.Add(newRound);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create Round. Please try again later.");
            }
        }
        public void CreateRoundPlayerStats(List<RoundPlayerStats> rpsList)
        {
            try
            {
                if (rpsList.GroupBy(rps => new { rps.PlayerId, rps.RoundId }).Any(g => g.Count() > 2))
                {
                    throw new Exception("RPS list error: More than 2 identical Player Ids in Round found.");
                }
                foreach (var newRps in rpsList)
                {
                    _roundPlayerStatsRepository.Add(newRps);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Logger error");
                throw new Exception("Failed to create Round Player Stats. Please try again later.", ex);
            }
        }
    }
}
