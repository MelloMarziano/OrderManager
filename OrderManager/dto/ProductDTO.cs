﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrderManager.dto
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public List<string> Images { get; set; }
    }
}