using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace OffertService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OptionsController : Controller
    {
        private Dictionary<string, City> cities;

        private List<Item> data;

        private void GenerateCityData()
        {
            this.data = FileReader.ReadFile();
            this.cities = new Dictionary<string, City>();
            foreach(Item item in data)
            {
                Dictionary<string, int> prices = new Dictionary<string, int>();
                foreach (KeyValuePair<string, int> entry in item.Options)
                {
                    prices.Add(entry.Key, entry.Value);
                }

                cities.Add(item.Name.ToLower(), new City(item.Name, item.UnitPrice, prices));
            }
        }

        public OptionsController()
        {
            GenerateCityData();
        }

        private bool ValidateRequest(string param)
        {
            if (this.cities.ContainsKey(param))
                return true;
            return false;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get()
        {
            string city = null;
            if (!String.IsNullOrEmpty(HttpContext.Request.Query["city"]))
                city = HttpContext.Request.Query["city"];
            else
                return BadRequest();

            if (ValidateRequest(city))
            {
                JsonSerializer serializer = new JsonSerializer();
                string json = JsonConvert.SerializeObject(cities[city]);
                return Ok(json);
            }
            return NotFound();
        }
    }
}
