using OrderManager.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using OrderManager.dto;

namespace OrderManager.Controllers
{
    public class HomeController : Controller
    {
        private OMDbContext db = null;

        public HomeController()
        {
            db = new OMDbContext();
        }
        // GET: Home

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetProductsStock()
        {
            var productos = db.Products
                .Where(x=> x.Stock < 5)
       .Select(p => new ProductDTO
       {
           ProductId = p.Id,
           ProductName = p.ProductName,
           ProductDescription = p.ProductDescription,
           Price = p.Price,
           Stock = p.Stock,
           Images = p.Images.Select(i => i.FilePath).ToList()
       }).ToList();
            return Json(productos, JsonRequestBehavior.AllowGet);
        }
    }
}