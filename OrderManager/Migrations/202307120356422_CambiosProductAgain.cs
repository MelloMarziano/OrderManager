namespace OrderManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CambiosProductAgain : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Image",
                c => new
                    {
                        ImageId = c.Int(nullable: false, identity: true),
                        FilePath = c.String(),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ImageId)
                .ForeignKey("dbo.Product", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Image", "ProductId", "dbo.Product");
            DropIndex("dbo.Image", new[] { "ProductId" });
            DropTable("dbo.Image");
        }
    }
}
