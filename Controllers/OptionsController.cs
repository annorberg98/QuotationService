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

        private void GenerateCityData()
        {   
            //This would usually come from a database
            Dictionary<string, int> stockPrices = new Dictionary<string, int>();
            stockPrices.Add("Fönsterputs", 300);
            stockPrices.Add("Balkongstädning", 150);

            City StockHolm = new City("stockholm", 65, stockPrices);

            Dictionary<string, int> uppsalaPrices = new Dictionary<string, int>();
            uppsalaPrices.Add("Fönsterputs", 300);
            uppsalaPrices.Add("Bortforsling av skräp", 400);
            uppsalaPrices.Add("Balkongstädning", 150);

            City Uppsala = new City("uppsala", 50, uppsalaPrices);

            cities = new Dictionary<string, City>();
            cities.Add(Uppsala.Name ,Uppsala);
            cities.Add(StockHolm.Name, StockHolm);

            Console.WriteLine(cities.Keys);
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

            Console.WriteLine(city);
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
