using Newtonsoft.Json.Linq;
using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.Helpers
{
    public class JsonFileReader
    {
        public List<JToken> ExtractJsonData(string jsonDirectory, string node)
        {
            List<JToken> parsedJsonObjects = new List<JToken>();

            // Iterate through each JSON file in the directory
            foreach (var filePath in Directory.GetFiles(jsonDirectory, "*.json"))
            {
                // Read the JSON file
                var jsonContent = File.ReadAllText(filePath);

                // Parse the JSON content
                var parsedJsonObject = JObject.Parse(jsonContent).SelectToken($"$..{node}");

                if (parsedJsonObject != null)
                {
                    // Extract and save player data from the JSON object
                    parsedJsonObjects.Add(parsedJsonObject);
                }
            }
            return parsedJsonObjects;
        }
    }
}
