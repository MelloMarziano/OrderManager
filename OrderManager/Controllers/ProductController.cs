using OrderManager.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrderManager.Controllers
{
    public class ProductController : Controller
    {
        private OMDbContext db = null;

        public ProductController()
        {
            db = new OMDbContext();
        }
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProduct()
        {
            var productos = db.Products.ToList();
            return Json(productos, JsonRequestBehavior.AllowGet);
        }
    }
}