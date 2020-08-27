using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Threading.Tasks;

namespace OffertService.Controllers
{
    public class Offer
    {
        public City City { get; set; }

        public Dictionary<string, int> SelectedOptions;

        public int SurfaceToClean { get; set; }

        public int TotalPrice { get; set; }

        public Offer(City city, int surface, Dictionary<string, int> options)
        {
            this.City = city; ;
            this.SurfaceToClean = surface;
            SelectedOptions = options;
        }

        private void GenerateCityData()
        {
            //This would usually come from a database
            Dictionary<string, int> stockPrices = new Dictionary<string, int>();
            stockPrices.Add("Fönsterputs", 300);
            stockPrices.Add("Balkongstädning", 150);

            City = new City("stockholm", 65, stockPrices);

            TotalPrice = this.CalculateCost();
        }
        
        private int CalculateCost()
        {
            int totalSurfacePrice, totalPrice;
            
            totalSurfacePrice = SurfaceToClean * City.UnitPrice;

            totalPrice = SelectedOptions.Sum(x => x.Value) + totalSurfacePrice;

            return totalPrice;
        }
    }
}
