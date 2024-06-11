using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Newtonsoft.Json.Linq;
using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.Models;
using Sprache;
using System.Configuration;
using System.Runtime.InteropServices;

namespace NS2Nexus.Server.Helpers
{
    public class PlayerParseHelper
    {
        private IPlayerLogic _playerLogic;
        public PlayerParseHelper(IPlayerLogic playerLogic)
        {
            _playerLogic = playerLogic;
        }
        public static void ParsePlayer()
        {
            string pathToJson = "C:\\Users\\Wraithling\\Desktop\\NS2NexusRounds";
            
            JsonFileReader reader = new JsonFileReader();

            List<JToken> fileList = reader.ExtractJsonData(pathToJson, "PlayerStats");

            List<Player> players = new List<Player>();
            List<PlayerStats> stats = new List<PlayerStats>();

            int internalId = 0;

            // Read json file
            foreach (JToken file in fileList)
            {
                // Read PlayerStats object
                foreach (JToken playerData in file)
                {
                    JToken marineTeamObject = playerData["1"]!;
                    JToken alienTeamObject = playerData["2"]!;

                    // Check if player is already in the list
                    if (players.Any(player => player.SteamId == Int32.Parse((playerData as JProperty)?.Name!)))
                    {
                        // Update playerStats data
                        Player existingPlayer = players.FirstOrDefault(player => player.SteamId == Int32.Parse((playerData as JProperty)?.Name!))!;
                        PlayerStats existingStats = stats.FirstOrDefault(player => player.PlayerId == existingPlayer.Id)!;

                        existingPlayer.PlayerName = playerData["playerName"]!.ToString();

                        existingStats.MarineHits += ParseInt(marineTeamObject, "hits");
                        existingStats.MarineOnosHits += ParseInt(marineTeamObject, "onosHits");
                        existingStats.MarineMisses += ParseInt(marineTeamObject, "misses");
                        existingStats.AlienHits += ParseInt(alienTeamObject, "hits");
                        existingStats.AlienMisses += ParseInt(alienTeamObject, "misses");
                        existingStats.MarineKills += ParseInt(marineTeamObject, "kills");
                        existingStats.MarineDeaths += ParseInt(marineTeamObject, "deaths");
                        existingStats.AlienKills += ParseInt(alienTeamObject, "kills");
                        existingStats.AlienDeaths += ParseInt(alienTeamObject, "deaths");
                        continue;
                    }

                    Player player = new Player
                    {
                        Id = internalId,
                        SteamId = Int32.Parse((playerData as JProperty)?.Name!),
                        PlayerName = playerData["playerName"]!.ToString(),

                    };
                    PlayerStats playerStats = new PlayerStats
                    {
                        Id = internalId,
                        PlayerId = internalId,
                        MarineHits = ParseInt(marineTeamObject, "hits"),
                        MarineOnosHits = ParseInt(marineTeamObject, "onosHits"),
                        MarineMisses = ParseInt(marineTeamObject, "misses"),
                        AlienHits = ParseInt(alienTeamObject, "hits"),
                        AlienMisses = ParseInt(alienTeamObject, "misses"),
                        MarineKills = ParseInt(marineTeamObject, "kills"),
                        MarineDeaths = ParseInt(marineTeamObject, "deaths"),
                        AlienKills = ParseInt(alienTeamObject, "kills"),
                        AlienDeaths = ParseInt(alienTeamObject, "deaths"),
                        CommanderSkill = ParseInt(playerData, "commanderSkill"),
                        CommanderSkillMarine = ParseInt(playerData, "commanderSkillMarine"),
                        CommanderSkillAlien = ParseInt(playerData, "commanderSkillAlien"),
                        HiveSkill = ParseInt(playerData, "hiveSkill"),
                        HiveSkillMarine = ParseInt(playerData, "hiveSkillMarine"),
                        HiveSkillAlien = ParseInt(playerData, "hiveSkillAlien"),
                        PlayerSkillOffset = ParseInt(playerData, "playerSkillOffset"),
                        Adagrad = ParseDouble(playerData, "adagrad"),
                        CommAdagrad = ParseDouble(playerData, "commAdagrad")
                    };
                    players.Add(player);
                    stats.Add(playerStats);
                    internalId++;
                }
            }
        }
        private static int ParseInt(JToken token, string propertyName)
        {
            return Int32.Parse(token[propertyName]!.ToString());
        }
        private static double ParseDouble(JToken token, string propertyName)
        {
            return Double.Parse(token[propertyName]!.ToString());
        }
    }
}
