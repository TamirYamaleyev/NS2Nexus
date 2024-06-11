using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.DAL.Interfaces;
using NS2Nexus.Server.DAL.Repositories;
using NS2Nexus.Server.Helpers;
using NS2Nexus.Server.Models;
using System.Numerics;

namespace NS2Nexus.Server.BLL.Logic
{
    public class PlayerLogic : IPlayerLogic
    {
        private readonly ILogger<PlayerLogic> _logger;

        private readonly IEntityBaseRepository<Player> _playerRepository;
        private readonly IEntityBaseRepository<PlayerStats> _playerStatsRepository;
        private readonly IEntityBaseRepository<ClassPlaytime> _classPlaytimeRepository;
        public PlayerLogic(IEntityBaseRepository<Player> playerRepository, IEntityBaseRepository<PlayerStats> playerStatsRepository, IEntityBaseRepository<ClassPlaytime> classPlaytimeRepository, IEntityBaseRepository<RoundPlayerStats> roundPlayerStatsRepository, IEntityBaseRepository<KillFeed> killFeedRepository, ILogger<PlayerLogic> logger)
        {
            _playerRepository = playerRepository;
            _playerStatsRepository = playerStatsRepository;
            _classPlaytimeRepository = classPlaytimeRepository;
            this._logger = logger;
            PlayerParseHelper.ParsePlayer();
        }

        // <------------ PLAYERS ------------> //

        public IEnumerable<Player> GetAllPlayers()
        {
            try
            {
                var players = _playerRepository.GetAll();
                return players;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception("Failed to fetch Players. Please try again later.");
            }
        }

        public Player GetPlayerById(int playerId)
        {
            try
            {
                var player = _playerRepository.GetSingle(playerId);
                return player;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Player. Please try again later.");
            }
        }

        public Player GetPlayerBySteamId(int steamId)
        {
            try
            {
                var player = _playerRepository.SingleFindBy(p => p.SteamId == steamId);
                return player;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Player. Please try again later.");
            }
        }

        public Player CreatePlayer(Player newPlayer)
        {
            try
            {
                var existingPlayer = _playerRepository.GetSingle(newPlayer.Id);
                if (existingPlayer == null)
                {
                    _playerRepository.Add(newPlayer);
                    return newPlayer;
                }
                throw new Exception("This Player already exists.");
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create Player. Please try again later.");
            }
        }
        public Player EditPlayer(Player editedPlayer)
        {
            try
            {
                var player = _playerRepository.GetSingle(editedPlayer.Id);

                player.PlayerName = editedPlayer.PlayerName;
                player.ProfilePictureUrl = editedPlayer.ProfilePictureUrl;
                player.DiscordTag = editedPlayer.DiscordTag;

                _playerRepository.Edit(player);

                return player;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to edit Player. Please try again later.");
            }
        }

        // <------------ STATS ------------> //

        public IEnumerable<PlayerStats> GetAllPlayerStats()
        {
            try
            {
                var playersStats = _playerStatsRepository.GetAll();
                return playersStats;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Players Stats. Please try again later.");
            }
        }
        public PlayerStats GetPlayerStatsById(int playerId)
        {
            try
            {
                var playerStats = _playerStatsRepository.SingleFindBy(p => p.PlayerId == playerId);
                return playerStats;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch PlayerStats. Please try again later.");
            }
        }
        public PlayerStats CreatePlayerStats(PlayerStats newPlayerStats)
        {
            try
            {
                var existingPlayerStats = _playerStatsRepository.GetSingle(newPlayerStats.PlayerId);
                if (existingPlayerStats == null)
                {
                    _playerStatsRepository.Add(newPlayerStats);
                    return newPlayerStats;
                }
                throw new Exception("This Player Stats already exists.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception("Failed to create Player Stats. Please try again later.");
            }
        }
        public PlayerStats EditPlayerStats(int playerId, PlayerStats editedPlayerStats)
        {
            try
            {
                var playerStats = _playerStatsRepository.SingleFindBy(p => p.PlayerId == playerId);

                playerStats.MarineAccuracy = editedPlayerStats.MarineAccuracy;
                playerStats.AlienAccuracy = editedPlayerStats.AlienAccuracy;
                playerStats.MarineKdr = editedPlayerStats.MarineKdr;
                playerStats.AlienKdr = editedPlayerStats.AlienKdr;
                playerStats.CommanderSkill = editedPlayerStats.CommanderSkill;
                playerStats.CommanderSkillMarine = editedPlayerStats.CommanderSkillMarine;
                playerStats.CommanderSkillAlien = editedPlayerStats.CommanderSkillAlien;
                playerStats.HiveSkill = editedPlayerStats.HiveSkill;
                playerStats.HiveSkillMarine = editedPlayerStats.HiveSkillMarine;
                playerStats.HiveSkillAlien = editedPlayerStats.HiveSkillAlien;
                playerStats.PlayerSkillOffset = editedPlayerStats.PlayerSkillOffset;
                playerStats.Adagrad = editedPlayerStats.Adagrad;
                playerStats.CommAdagrad = editedPlayerStats.CommAdagrad;

                _playerStatsRepository.Edit(playerStats);

                return playerStats;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to edit Player Stats. Please try again later.");
            }
        }

        // <------------ CLASS PLAYTIME ------------> //

        public IEnumerable<ClassPlaytime> GetClassPlaytimeById(int playerId)
        {
            try
            {
                var classPlayTimes = _classPlaytimeRepository.GetAll().Where(p => p.PlayerId == playerId).OrderBy(p => p.PlayTime);
                return classPlayTimes;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Class Playtime. Please try again later.");
            }
        }
        public ClassPlaytime CreateClassPlaytime(ClassPlaytime newPlaytime)
        {
            try
            {
                var existingClassPlaytime = _classPlaytimeRepository.GetSingle(newPlaytime.Id);
                if (existingClassPlaytime == null)
                {
                    _classPlaytimeRepository.Add(newPlaytime);
                    return newPlaytime;
                }
                throw new Exception("This Class Playtime already exists.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception("Failed to create new Class Playtime. Please try again later.");
            }
        }
        public ClassPlaytime EditClassPlaytime(ClassPlaytime editedPlaytime)
        {
            try
            {
                var classPlayTimes = _classPlaytimeRepository.SingleFindBy(p => p.PlayerId == editedPlaytime.PlayerId);

                classPlayTimes.PlayTime = editedPlaytime.PlayTime;
                _classPlaytimeRepository.Edit(classPlayTimes);
                return classPlayTimes;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to edit Class Playtime. Please try again later.");
            }
        }
        
    }
}
