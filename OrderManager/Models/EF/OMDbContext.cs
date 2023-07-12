using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace OrderManager.Models.EF
{
    public class OMDbContext : DbContext
    {
        public OMDbContext():base("name= OrdersManagerDB ") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Customer> Clientes { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}