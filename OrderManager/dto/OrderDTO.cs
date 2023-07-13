using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrderManager.dto
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public CustomerDTO Customer { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }
        public string OrderTracking { get; set; }
    }
}