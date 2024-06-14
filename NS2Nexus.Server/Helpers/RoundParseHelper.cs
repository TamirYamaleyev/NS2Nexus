using dotenv.net;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Newtonsoft.Json.Linq;
using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.Models;
using Sprache;
using System.Configuration;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace NS2Nexus.Server.Helpers
{
    public class RoundParseHelper
    {
        public static (List<Player>, List<PlayerStats>, List<RoundPlayerStats>, List<RoundInfo>) ParseFiles()
        {
            DotEnv.Load();

            string pathToJson = "NS2NexusRounds";

            JsonFileReader reader = new JsonFileReader();// Extract JSON data from each file in the directory
            List<JToken> fileList = new List<JToken>();
            
            foreach (var filePath in Directory.GetFiles(pathToJson, "*.json"))
            {
                List<JToken> fileData = reader.ExtractJsonData(filePath); // Pass directory path
                fileList.AddRange(fileData);
            }

            List<Player> playerList = new List<Player>();
            List<PlayerStats> statsList = new List<PlayerStats>();
            List<RoundPlayerStats> rpsList = new List<RoundPlayerStats>();
            List<RoundInfo> roundList = new List<RoundInfo>();

            int playerIdCounter = 1;
            int internalPlayerId;

            int internalRoundId = 1;

            // Read json file
            foreach (JToken file in fileList)
            {
                // Player, Server and Round objects inside the json file
                JToken playerStats = file["PlayerStats"]!;
                JToken serverInfo = file["ServerInfo"]!;
                JToken roundInfo = file["RoundInfo"]!;

                // Round scope
                if (playerStats is JObject playerStatsObject)
                {
                    // Player scope
                    foreach (JToken playerDataToken in playerStatsObject.Children())
                    {
                        if (playerDataToken is JProperty playerDataProperty)
                        {
                            JToken playerData = playerDataProperty.Value;

                            if (playerData is JObject playerDataObject)
                            {
                                // Marine Team
                                JToken marineTeamObject = playerData["1"]!;
                                // Alien Team
                                JToken alienTeamObject = playerData["2"]!;

                                // Check if player is already in the playerList
                                if (playerList.Any(player => player.SteamId == Int32.Parse(playerDataProperty.Name)))
                                {
                                    // Update Player + Stats
                                    Player existingPlayer = playerList.FirstOrDefault(player => player.SteamId == Int32.Parse(playerDataProperty.Name))!;
                                    PlayerStats existingStats = statsList.FirstOrDefault(player => player.PlayerId == existingPlayer.Id)!;

                                    UpdatePlayerStats(existingPlayer, existingStats, marineTeamObject, alienTeamObject, playerData);
                                    internalPlayerId = existingPlayer.Id;
                                }

                                else
                                {
                                    // Create new Player + Stats
                                    internalPlayerId = playerIdCounter;
                                    Player player = CreatePlayer(internalPlayerId, playerDataProperty, playerData);
                                    PlayerStats stat = CreatePlayerStats(internalPlayerId, marineTeamObject, alienTeamObject, playerData);

                                    playerList.Add(player);
                                    statsList.Add(stat);

                                    playerIdCounter++;
                                }

                                // Check if player played on alien team
                                if (ParseDouble(alienTeamObject, "timePlayed") > 0)
                                {
                                    // Create Alien RPS
                                    RoundPlayerStats alienRPS = CreateRPS(internalRoundId, internalPlayerId, 2, alienTeamObject);

                                    rpsList.Add(alienRPS);
                                }

                                // Check if player played on marine team
                                if (ParseDouble(marineTeamObject, "timePlayed") > 0)
                                {
                                    // Create Marine RPS
                                    RoundPlayerStats rps = CreateRPS(internalRoundId, internalPlayerId, 1, marineTeamObject);

                                    rpsList.Add(rps);
                                }
                            }
                        }
                    }
                }

                // Create Round
                RoundInfo round = CreateRound(internalRoundId, serverInfo, roundInfo);
                roundList.Add(round);
                internalRoundId++;
            }
            return (playerList, statsList, rpsList, roundList);
        }
        private static int ParseInt(JToken token, string propertyName)
        {
            return Int32.Parse(token[propertyName]!.ToString());
        }
        private static double ParseDouble(JToken token, string propertyName)
        {
            return Double.Parse(token[propertyName]!.ToString());
        }
        private static void UpdatePlayerStats(Player existingPlayer, PlayerStats existingStats, JToken marineTeamObject, JToken alienTeamObject, JToken playerData)
        {
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
        }
        private static Player CreatePlayer(int internalId, JProperty playerDataProperty, JToken playerDataToken)
        {
            int steam = Int32.Parse(playerDataProperty.Name);
            string name = playerDataToken!["playerName"]!.ToString();
            Player player = new Player
            {
                Id = internalId,
                SteamId = steam,
                PlayerName = name,
            };
            return player;
        }
        private static PlayerStats CreatePlayerStats(int internalId, JToken marineTeamObject, JToken alienTeamObject, JToken playerData)
        {
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
                CommanderSkillMarine = playerData.SelectToken("commanderSkillMarine") != null ? ParseInt(playerData, "commanderSkillMarine") : 0,
                CommanderSkillAlien = playerData.SelectToken("commanderSkillAlien") != null ? ParseInt(playerData, "commanderSkillAlien") : 0,
                HiveSkill = ParseInt(playerData, "hiveSkill"),
                HiveSkillMarine = playerData.SelectToken("hiveSkillMarine") != null ? ParseInt(playerData, "hiveSkillMarine") : 0,
                HiveSkillAlien = playerData.SelectToken("hiveSkillAlien") != null ? ParseInt(playerData, "hiveSkillAlien") : 0,
                PlayerSkillOffset = ParseInt(playerData, "playerSkillOffset"),
                Adagrad = ParseDouble(playerData, "adagrad"),
                CommAdagrad = ParseDouble(playerData, "commAdagrad")
            };
            return playerStats;
        }
        private static RoundPlayerStats CreateRPS(int internalRoundId, int internalPlayerId, int team, JToken teamObject)
        {
            RoundPlayerStats rps = new RoundPlayerStats
            {
                RoundId = internalRoundId,
                PlayerId = internalPlayerId,
                TeamNumber = team,
                Hits = ParseInt(teamObject, "hits"),
                Kills = ParseInt(teamObject, "kills"),
                Misses = ParseInt(teamObject, "misses"),
                Assists = ParseInt(teamObject, "assists"),
                Deaths = ParseInt(teamObject, "deaths"),
                OnosHits = ParseInt(teamObject, "onosHits"),
                TimePlayed = ParseDouble(teamObject, "timePlayed"),
                CommanderTime = ParseDouble(teamObject, "commanderTime"),
                Score = ParseInt(teamObject, "score"),
                TimeBuilding = ParseDouble(teamObject, "timeBuilding"),
                PlayerDamage = ParseDouble(teamObject, "playerDamage"),
                StructureDamage = ParseDouble(teamObject, "structureDamage")
            };
            return rps;
        }
        private static RoundInfo CreateRound(int internalRoundId, JToken serverInfo, JToken roundInfo)
        {
            RoundInfo round = new RoundInfo
            {
                Id = internalRoundId,
                ServerName = serverInfo["name"]!.ToString(),
                Map = roundInfo["mapName"]!.ToString(),
                GameMode = roundInfo["gameMode"]!.ToString(),
                RoundDate = ParseInt(roundInfo, "roundDate"),
                RoundLength = ParseDouble(roundInfo, "roundLength"),
                WinningSide = ParseInt(roundInfo, "winningTeam"),
                PlayedStatus = true
            };
            return round;
        }
    }
}
