namespace ngHealthyGarden.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CustomizedUserTable_v2 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Users", "LastName");
            DropColumn("dbo.Users", "FirstName");
            DropColumn("dbo.CustomerInfo", "PhoneNumber");
            DropColumn("dbo.CustomerInfo", "Email");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "LastName", c => c.String(maxLength: 100));
            AddColumn("dbo.Users", "FirstName", c => c.String(maxLength: 100));
            AddColumn("dbo.CustomerInfo", "PhoneNumber", c => c.String(maxLength: 12));
            AddColumn("dbo.CustomerInfo", "Email", c => c.String(maxLength: 100));
        }
    }
}
