using Microsoft.AspNetCore.Http.Features;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace OffertService
{
    public class FileReader
    {
        public static List<Item> ReadFile()
        {
            using(StreamReader r = new StreamReader("Data.json"))
            {
                string json = r.ReadToEnd();
                List<Item> items = JsonConvert.DeserializeObject<List<Item>>(json);

                return items;
            }
        }

        public static string[] GetCities()
        {
            List<Item> items = ReadFile();
            string[] cities = new string[items.Count];

            for(int i = 0; i < items.Count; i++)
            {
                cities[i] = items[i].Name;
            }

            return cities;
        }
    }

    public class Item
    {
        public string Name;
        public int UnitPrice;
        public Dictionary<string, int> Options;
    }
}
