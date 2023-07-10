using OrderManager.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.Mvc;

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
        // GET: Home

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetProductsStock()
        {
            var productos = db.Products.Where(p => p.Stock < 5).ToList();
            return Json(productos, JsonRequestBehavior.AllowGet);
        }
    }
}