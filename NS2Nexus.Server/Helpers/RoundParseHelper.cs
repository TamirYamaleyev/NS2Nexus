using Newtonsoft.Json.Linq;
using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.Helpers
{
    public class RoundParseHelper
    {
        private IRoundLogic _roundLogic;
        public RoundParseHelper(IRoundLogic roundLogic)
        {
            _roundLogic = roundLogic;
        }
        public static void ParseRound()
        {
            string pathToJson = "C:\\Users\\Wraithling\\Desktop\\NS2NexusRounds";

            JsonFileReader reader = new JsonFileReader();

            List<JToken> fileList = reader.ExtractJsonData(pathToJson, "RoundInfo");

            List<RoundInfo> rounds = new List<RoundInfo>();
            List<RoundPlayerStats> rps = new List<RoundPlayerStats>();

            int internalId = 0;

            // Read json file
            foreach (JToken file in fileList)
            {
                // Read RoundInfo object
                JToken ServerInfo = file["ServerInfo"]!;
                JToken RoundInfo = file["RoundInfo"]!;

                RoundInfo round = new RoundInfo
                {
                    Id = internalId,
                    ServerName = ServerInfo["name"]!.ToString(),
                    Map = RoundInfo["mapName"]!.ToString(),
                    GameMode = RoundInfo["gameMode"]!.ToString(),
                    RoundDate = ParseInt(RoundInfo, "roundDate"),
                    RoundLength = ParseDouble(RoundInfo, "roundLength"),
                    WinningSide = ParseInt(RoundInfo, "winningTeam"),
                    PlayedStatus = true,
                };
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
