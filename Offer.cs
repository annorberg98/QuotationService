using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Threading.Tasks;

namespace OffertService.Controllers
{
    public class Offer
    {
        private string[] selectedoptions;

        public string City { get; set; }

        public Dictionary<string, int> Options { get; set; }

        public string[] SelectedOptions
        {
            get { return this.selectedoptions; }
            set
            {
                if (value == null)
                    selectedoptions = new string[0];
                else
                    selectedoptions = value;

            }
        }

        public int SurfaceToClean { get; set; }

        public int TotalPrice { get; set; }

        public int SurfaceUnitPrice { get; set; }

        private Item data;

        public Offer(string city, int surface, string[] options)
        {
            this.City = city; ;
            this.SurfaceToClean = surface;
            SelectedOptions = options;

            GenerateQuotation();
        }

        /// <summary>
        /// Reads the data of the City selected by the user
        /// </summary>
        private void GenerateQuotation()
        {
            data = FileReader.ReadFile().Find(item => item.Name == this.City);

            this.SurfaceUnitPrice = data.UnitPrice;

            Options = new Dictionary<string, int>();

            foreach(string value in SelectedOptions)
            {
                Options.Add(value, data.Options[value]);
            }

            TotalPrice = this.CalculateTotalCost();
        }

        /// <summary>
        /// Calculates to total price
        /// </summary>
        /// <returns></returns>
        private int CalculateTotalCost()
        {
            int totalSurfacePrice;

            totalSurfacePrice = SurfaceToClean * data.UnitPrice;

            int totalOptionsPrice = 0;

            foreach (string value in this.SelectedOptions)
            {
                totalOptionsPrice += data.Options[value];
            }

            return totalOptionsPrice + totalSurfacePrice;
        }
    }
}
