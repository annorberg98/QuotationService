using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OffertService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CityController : Controller
    {
        public string[] Cities;
        public CityController()
        {
            this.Cities = FileReader.GetCities();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Get()
        {
            return Ok(JsonConvert.SerializeObject(this.Cities));
        }
    }
}
