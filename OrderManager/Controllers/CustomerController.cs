using OrderManager.Models.EF;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrderManager.Controllers
{
    public class CustomerController : Controller
    {

        private OMDbContext db = null;

        public CustomerController()
        {
            db = new OMDbContext();
        }
        // GET: Client
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetClients()
        {
            var clientes = db.Clientes.ToList();
            return Json(clientes, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveClient(Customer cliente)
        {
            db.Clientes.Add(cliente);
            db.SaveChanges();
            return Json(null);
        }


        [HttpPost]
        public JsonResult Edit(Customer client)
        {
            db.Entry(client).State = EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var cliente = db.Clientes.Find(id);
            db.Clientes.Remove(cliente);
            db.SaveChanges();
            return Json(null);
        }
    }
}