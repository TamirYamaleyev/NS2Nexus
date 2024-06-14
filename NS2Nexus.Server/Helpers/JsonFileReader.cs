using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;

namespace NS2Nexus.Server.Helpers
{
    public class JsonFileReader
    {
        public List<JToken> ExtractJsonData(string jsonFilePath)
        {
            List<JToken> parsedJsonObjects = new List<JToken>();

            try
            {
                // Read the JSON file
                var jsonContent = File.ReadAllText(jsonFilePath);

                if (!string.IsNullOrWhiteSpace(jsonContent))
                {
                    // Parse the entire JSON content
                    var parsedJsonObject = JObject.Parse(jsonContent);

                    // Add the parsed JSON object to the list
                    parsedJsonObjects.Add(parsedJsonObject);
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions while reading or parsing the JSON file
                Console.WriteLine($"Error processing file '{jsonFilePath}': {ex.Message}");
                // Optionally, you can choose to log the error or take other appropriate actions
            }

            return parsedJsonObjects;
        }
    }
}
