using OrderManager.dto;
using OrderManager.Models.EF;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrderManager.Controllers
{
    public class OrderController : Controller
    {

        private OMDbContext db = null;

        public OrderController()
        {
            db = new OMDbContext();
        }
        // GET: Order
        public ActionResult Index()
        {
           
            
            return View();
        }

        public JsonResult GetOrders()
        {

            var orders = db.Orders
        .Include(o => o.Customer)
        .Include(o => o.OrderItems)
        .ToList();

            var orderDTOs = orders.Select(o => new OrderDTO
            {
                Id = o.Id,
                OrderDate = o.OrderDate,
                Customer = new CustomerDTO
                {
                    Id = o.Customer.Id,
                    Name = o.Customer.Name,
                    
                },
                OrderItems = o.OrderItems.Select(oi => new OrderItemDTO
                {
                    Id = oi.Id,
                    OrderId = oi.OrderId,
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    Price = oi.Price,
                    ProductName = oi.Product.ProductName
                }).ToList(),
                OrderTracking = o.OrderTracking
            }).ToList();

            return Json(orderDTOs, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetOrderById(int id)
        {
            var order = db.Orders
        .Include(o => o.Customer)
        .Include(o => o.OrderItems)
        .FirstOrDefault(o => o.Id == id);

            if (order != null)
            {
                var orderDTO = new OrderDTO
                {
                    Id = order.Id,
                    OrderDate = order.OrderDate,
                    Customer = new CustomerDTO
                    {
                        Id = order.Customer.Id,
                        Name = order.Customer.Name,
                    },
                    OrderTracking = order.OrderTracking,
                    OrderItems = order.OrderItems.Select(oi => new OrderItemDTO
                    {
                        Id = oi.Id,
                        ProductId = oi.ProductId,
                        Quantity = oi.Quantity,
                        Price = oi.Price,
                        ProductName = oi.Product.ProductName
                    }).ToList()
                };

                return Json(orderDTO, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null);
            }
        }
        [HttpPost]
        public JsonResult saveOrder(int? CustomerId, string OrderTracking, List<OrderItem> Items)
        {
            

            Order order = new Order
            {
                OrderDate = DateTime.Now,
                CustomerId = CustomerId ?? 1,
                OrderTracking = OrderTracking,
                OrderItems = Items,
            };

            db.Orders.Add(order);
            db.SaveChanges();

            return Json(null);
        }
    }
}