namespace ngHealthyGarden.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CustomizedUserTable : DbMigration
    {
        public override void Up()
        {   
            AddColumn("dbo.Users", "FirstName", c => c.String(maxLength: 100));
            AddColumn("dbo.Users", "LastName", c => c.String(maxLength: 100));
            AddColumn("dbo.Users", "JoinDate", c => c.DateTime());
            AddColumn("dbo.Users", "CustomerInfoId", c => c.Int());
            CreateIndex("dbo.Users", "CustomerInfoId");
            AddForeignKey("dbo.Users", "CustomerInfoId", "dbo.CustomerInfo", "CustomerInfoId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "CustomerInfoId", "dbo.CustomerInfo");
            DropIndex("dbo.Users", new[] { "CustomerInfoId" });
            DropColumn("dbo.Users", "CustomerInfoId");
            DropColumn("dbo.Users", "JoinDate");
            DropColumn("dbo.Users", "LastName");
            DropColumn("dbo.Users", "FirstName");
        }
    }
}
