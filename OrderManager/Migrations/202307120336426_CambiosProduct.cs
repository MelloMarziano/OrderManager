namespace OrderManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CambiosProduct : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Image", "ProductId", "dbo.Product");
            DropIndex("dbo.Image", new[] { "ProductId" });
            DropTable("dbo.Image");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Image",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FilePath = c.String(nullable: false),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.Image", "ProductId");
            AddForeignKey("dbo.Image", "ProductId", "dbo.Product", "Id", cascadeDelete: true);
        }
    }
}
