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

        private List<Item> data;

        public string[] SelectedOptions;

        private void GenerateCityData()
        {
            data = FileReader.ReadFile();
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
