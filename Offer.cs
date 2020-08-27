using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Threading.Tasks;

namespace OffertService.Controllers
{
    public class Offer
    {
        public string City { get; set; }

        public string[] SelectedOptions { get; set; }

        public int SurfaceToClean { get; set; }

        public int TotalPrice { get; set; }

        private Item data;

        public Offer(string city, int surface, string[] options)
        {
            this.City = city; ;
            this.SurfaceToClean = surface;
            SelectedOptions = options;

            GenerateQuotation();
        }

        private void GenerateQuotation()
        {
            data = FileReader.ReadFile().Find(item => item.Name == this.City);

            TotalPrice = this.CalculateTotalCost();
        }

        private int CalculateTotalCost()
        {
            int totalSurfacePrice;

            totalSurfacePrice = SurfaceToClean * data.UnitPrice;

            int totalOptionsPrice = 0;
            
            foreach(string value in this.SelectedOptions)
            {
                totalOptionsPrice += data.Options[value];
            }

            return totalOptionsPrice + totalSurfacePrice;
        }
    }
}
