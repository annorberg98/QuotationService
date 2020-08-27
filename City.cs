using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OffertService
{
    public class City
    {
        public string Name { get; set; }

        public int UnitPrice { get; set; }

        /// Tillvalet samt Pris
        public Dictionary<string, int> Options;

        public City(string name, int price, Dictionary<string, int> options)
        {
            this.Name = name;
            UnitPrice = price;
            Options = options;
        }
    }
}
