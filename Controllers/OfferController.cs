using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace OffertService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OfferController : Controller
    {
        private Dictionary<string, City> cities;

        private List<Item> data;

        public string[] SelectedOptions;

        private void GenerateCityData()
        {
            data = FileReader.ReadFile();

            /*//This would usually come from a database
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
            cities.Add(Uppsala.Name, Uppsala);
            cities.Add(StockHolm.Name, StockHolm);*/
        }


        public OfferController()
        {
            GenerateCityData();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get()
        {
            string city = null;
            int surface = 0;
            //3 is the max amount of options available
            string options = string.Empty;

            if (!String.IsNullOrEmpty(HttpContext.Request.Query["city"]))
                city = HttpContext.Request.Query["city"];
            else
                return BadRequest();

            if (!String.IsNullOrEmpty(HttpContext.Request.Query["surface"]))
            {
                try
                {
                    surface = Convert.ToInt32(HttpContext.Request.Query["surface"]);
                }
                catch
                {
                    return BadRequest();
                }
            }
            else
                return BadRequest();

            if (!String.IsNullOrEmpty(HttpContext.Request.Query["options"]))
            {
                options = HttpContext.Request.Query["options"].ToString();
                if (options == "[]")
                    SelectedOptions = null;
                else
                    SelectedOptions = options.Replace("\"", "").Replace("[", "").Replace("]", "").Split(",");
            }
            else
            {
                SelectedOptions = null;
                Console.WriteLine("options is null");
            }
            return Ok(new Offer(city, surface, SelectedOptions));
        }
    }
}
