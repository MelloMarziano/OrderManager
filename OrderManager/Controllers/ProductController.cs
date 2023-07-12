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
            
            var productos = db.Products
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
        public JsonResult SaveProduct()
        {
            var newProduct = new Product
            {
                ProductName = "Camiseta Jack and Jones",
                ProductDescription = "Esta es una descripcion corta",
                Stock = 4,
                Price = 99.99m,
                Images = new List<Image>{
                    new Image { FilePath = "https://img01.ztat.net/article/spp-media-p1/fb199d2a99f2399d90d6721904724c3f/3481b7ccef2641a1ad1a4670cc3df443.jpg?imwidth=762&filter=packshot" },
                    new Image { FilePath = "https://img01.ztat.net/article/spp-media-p1/fb199d2a99f2399d90d6721904724c3f/3481b7ccef2641a1ad1a4670cc3df443.jpg?imwidth=762&filter=packshot" }
                }
            };


            // Agregar el producto al contexto de base de datos y guardar los cambios
            db.Products.Add(newProduct);
            db.SaveChanges();

            // El producto se ha agregado exitosamente a la base de datos
            Console.WriteLine("Producto agregado correctamente");
            return Json(newProduct);
        }

    }
}