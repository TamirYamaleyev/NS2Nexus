using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.DAL.Interfaces;
using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Logic
{
    public class RoundLogic : IRoundLogic
    {
        private readonly ILogger<RoundLogic> _logger;

        private readonly IEntityBaseRepository<RoundInfo> _roundRepository;
        private readonly IEntityBaseRepository<RoundPlayerStats> _roundPlayerStatsRepository;
        private readonly IEntityBaseRepository<KillFeed> _killFeedRepository;
        public RoundLogic(IEntityBaseRepository<RoundInfo> roundRepository, IEntityBaseRepository<RoundPlayerStats> roundPlayerStatsRepository, IEntityBaseRepository<KillFeed> killFeedRepository, ILogger<RoundLogic> logger)
        {
            _roundRepository = roundRepository;
            _roundPlayerStatsRepository = roundPlayerStatsRepository;
            _killFeedRepository = killFeedRepository;
            _logger = logger;
        }

        // <------------ ROUNDS ------------> //

        public IEnumerable<RoundInfo> GetAllRounds()
        {
            try
            {
                var rounds = _roundRepository.GetAll();
                return rounds;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Rounds. Please try again later.");
            }
        }
        public IEnumerable<RoundInfo> GetAllRoundsByPlayerId(int playerId)
        {
            try
            {
                var roundIDs = _roundPlayerStatsRepository.GetAll().Where(r => r.PlayerId == playerId).Select(r => r.RoundId).ToList();
                // Debug: Check if roundIDs list is populated
                if (!roundIDs.Any())
                {
                    throw new Exception("No round IDs found for the given player ID.");
                }

                var rounds = _roundRepository.GetAll().Where(r => roundIDs.Contains(r.Id)).ToList();
                if (!roundIDs.Any())
                {
                    throw new Exception("No round IDs found for the given player ID.");
                }

                return rounds;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Rounds by Player. Please try again later.");
            }
        }
        public RoundInfo GetRoundById(int roundId)
        {
            try
            {
                var round = _roundRepository.GetSingle(roundId);
                return round;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Round. Please try again later.");
            }
        }
        public RoundInfo CreateRound(RoundInfo newRound)
        {
            try
            {
                var existingRound = _roundRepository.GetSingle(newRound.Id);
                if (existingRound == null)
                {
                    _roundRepository.Add(newRound);
                    return newRound;
                }
                throw new Exception("This Round already exists.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception("Failed to create Round. Please try again later.");
            }
        }

        // <------------ ROUND PLAYER STATS ------------> //

        public IEnumerable<RoundPlayerStats> GetAllStatsInRound(int roundId)
        {
            try
            {
                var roundPlayerStats = _roundPlayerStatsRepository.FindBy(rps => rps.RoundId == roundId);
                return roundPlayerStats;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Players Stats in Round. Please try again later.");
            }
        }
        public IEnumerable<RoundPlayerStats> GetAllStatsByPlayer(int playerId)
        {
            try
            {
                var roundPlayerStats = _roundPlayerStatsRepository.FindBy(rps => rps.PlayerId == playerId);
                return roundPlayerStats;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Round Player Stats. Please try again later");
            }
        }
        public RoundPlayerStats GetRoundPlayerStats(int roundId, int playerId)
        {
            try
            {
                var roundPlayerStats = _roundPlayerStatsRepository.SingleFindBy(rps => rps.PlayerId == playerId && rps.RoundId == roundId);
                return roundPlayerStats;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Round Player Stats. Please try again later");
            }
        }
        public RoundPlayerStats CreateRoundPlayerStats(RoundPlayerStats newRoundPlayerStats)
        {
            try
            {
                var existingRoundPlayerStats = _roundPlayerStatsRepository.SingleFindBy
                    (rps => rps.RoundId == newRoundPlayerStats.RoundId && rps.PlayerId == newRoundPlayerStats.PlayerId);

                if (existingRoundPlayerStats == null)
                {
                    _roundPlayerStatsRepository.Add(newRoundPlayerStats);
                }
                throw new Exception("This Player's Stats in this Round already exists.");
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create Round Player Stats. Please try again later.");
            }
        }

        // <------------ KILL FEED ------------> //

        public IEnumerable<KillFeed> GetKillFeedsInRound(int roundId)
        {
            try
            {
                var killFeeds = _killFeedRepository.GetAll();
                return killFeeds;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Killfeeds. Please try again later.");
            }
        }

        public KillFeed GetKillFeedById(int id)
        {
            try
            {
                var killFeed = _killFeedRepository.GetSingle(id);
                return killFeed;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Killfeed. Please try again later.");
            }
        }

        public KillFeed CreateKillFeed(KillFeed newKillFeed)
        {
            try
            {
                var existingKillFeed = _killFeedRepository.GetSingle(newKillFeed.Id);
                if (existingKillFeed == null)
                {
                    _killFeedRepository.Add(newKillFeed);
                    return newKillFeed;
                }
                throw new Exception("This Killfeed already exists.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception("Failed to create Killfeed. Please try again later.");
            }
        }
    }
}
