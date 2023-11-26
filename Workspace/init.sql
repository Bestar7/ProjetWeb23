DROP TABLE IF EXISTS "Order_Details" CASCADE;
DROP TABLE IF EXISTS "Employees" CASCADE;
DROP TABLE IF EXISTS "Customers" CASCADE;
DROP TABLE IF EXISTS "Orders" CASCADE;
DROP TABLE IF EXISTS "Products" CASCADE;

CREATE TABLE "Employees" (
  "EmployeeId"   SERIAL    NOT NULL PRIMARY KEY,
	"LastName" varchar (20) NOT NULL ,
	"FirstName" varchar (10) NOT NULL ,
	"Title" varchar (30) NULL ,
	"TitleOfCourtesy" varchar (25) NULL ,
	"BirthDate" timestamp NULL ,
	"HireDate" timestamp NULL ,
	"Address" varchar (60) NULL ,
	"City" varchar (15) NULL ,
	"Region" varchar (15) NULL ,
	"PostalCode" varchar (10) NULL ,
	"Country" varchar (15) NULL ,
	"HomePhone" varchar (24) NULL ,
	"Extension" varchar (4) NULL ,
	"Photo" TEXT NULL ,
	"Notes" TEXT NULL ,
	"ReportsTo" integer NULL ,
	"PhotoPath" varchar (255) NULL ,
	CONSTRAINT "FK_Employees_Employees" FOREIGN KEY ("ReportsTo") 
		REFERENCES "Employees" ("EmployeeId")
);

CREATE  INDEX "LastName" ON "Employees"("LastName");
--CREATE  INDEX "PostalCode" ON "Employees"("PostalCode");

CREATE TABLE "Customers" (
	"CustomerId"  SERIAL    NOT NULL PRIMARY KEY,
	"CompanyName" varchar (40) NOT NULL ,
	"ContactName" varchar (30) NULL ,
	"ContactTitle" varchar (30) NULL ,
	"Address" varchar (60) NULL ,
	"City" varchar (15) NULL ,
	"Region" varchar (15) NULL ,
	"PostalCode" varchar (10) NULL ,
	"Country" varchar (15) NULL ,
	"Phone" varchar (24) NULL ,
	"Fax" varchar (24) NULL 
);
 CREATE  INDEX "City" ON "Customers"("City");
 CREATE  INDEX "CompanyName" ON "Customers"("CompanyName");
 CREATE  INDEX "PostalCode" ON "Customers"("PostalCode");
 CREATE  INDEX "Region" ON "Customers"("Region");

CREATE TABLE "Orders" (
	"OrderId"  SERIAL    NOT NULL PRIMARY KEY,
	"CustomerId" integer NULL ,
	"EmployeeId" integer NULL ,
	"OrderDate" timestamp NULL ,
	"RequiredDate" timestamp NULL ,
	"ShippedDate" timestamp NULL ,
	"Freight" "money" NULL CONSTRAINT "DF_Orders_Freight" DEFAULT (0),
	"ShipName" varchar (40) NULL ,
	"ShipAddress" varchar (60) NULL ,
	"ShipCity" varchar (15) NULL ,
	"ShipRegion" varchar (15) NULL ,
	"ShipPostalCode" varchar (10) NULL ,
	"ShipCountry" varchar (15) NULL ,
	CONSTRAINT "FK_Orders_Customers" FOREIGN KEY ("CustomerId") 
		REFERENCES "Customers" ("CustomerId")  ON DELETE CASCADE,
	CONSTRAINT "FK_Orders_Employees" FOREIGN KEY ("EmployeeId") 
		REFERENCES "Employees" ("EmployeeId")  ON DELETE CASCADE
);

 CREATE  INDEX "CustomerId" ON "Orders"("CustomerId");
 CREATE  INDEX "CustomersOrders" ON "Orders"("CustomerId");
 CREATE  INDEX "EmployeeId" ON "Orders"("EmployeeId");
 CREATE  INDEX "EmployeesOrders" ON "Orders"("EmployeeId");
 CREATE  INDEX "OrderDate" ON "Orders"("OrderDate");
 CREATE  INDEX "ShippedDate" ON "Orders"("ShippedDate");
 CREATE  INDEX "ShipPostalCode" ON "Orders"("ShipPostalCode");

CREATE TABLE "Products" (
	"ProductId"  SERIAL    NOT NULL PRIMARY KEY,
	"ProductName" varchar (40) NOT NULL ,
	"QuantityPerUnit" varchar (20) NULL ,
	"UnitPrice" "money" NULL CONSTRAINT "DF_Products_UnitPrice" DEFAULT (0),
	"UnitsInStock" smallint NULL CONSTRAINT "DF_Products_UnitsInStock" DEFAULT (0),
	"UnitsOnOrder" smallint NULL CONSTRAINT "DF_Products_UnitsOnOrder" DEFAULT (0),
	"ReorderLevel" smallint NULL CONSTRAINT "DF_Products_ReorderLevel" DEFAULT (0),
	"Discontinued" bool NOT NULL CONSTRAINT "DF_Products_Discontinued" DEFAULT (false)
  
	--CONSTRAINT "CK_Products_UnitPrice" CHECK (UnitPrice >= 0),
	--CONSTRAINT "CK_ReorderLevel" CHECK (ReorderLevel >= 0),
	--CONSTRAINT "CK_UnitsInStock" CHECK (UnitsInStock >= 0),
	--CONSTRAINT "CK_UnitsOnOrder" CHECK (UnitsOnOrder >= 0)
);

 CREATE  INDEX "ProductName" ON "Products"("ProductName");

CREATE TABLE "Order_Details" (
	"OrderId" integer NOT NULL ,
	"ProductId" integer NOT NULL ,
	"UnitPrice" money NOT NULL CONSTRAINT "DF_Order_Details_UnitPrice" DEFAULT (0),
	"Quantity" numeric NOT NULL CONSTRAINT "DF_Order_Details_Quantity" DEFAULT (1),
	"Discount" float NOT NULL CONSTRAINT "DF_Order_Details_Discount" DEFAULT (0),
	CONSTRAINT "PK_Order_Details" PRIMARY KEY
	(
		"OrderId",
		"ProductId"
	),
	CONSTRAINT "FK_Order_Details_Orders" FOREIGN KEY ("OrderId")
    	REFERENCES "Orders" ("OrderId")  ON DELETE CASCADE,
	CONSTRAINT "FK_Order_Details_Products" FOREIGN KEY ("ProductId")
    	REFERENCES "Products" ("ProductId")  ON DELETE CASCADE
	--CONSTRAINT "CK_Discount" CHECK (Discount >= 0 and (Discount <= 1)),
	--CONSTRAINT "CK_Quantity" CHECK (Quantity > 0),
	--CONSTRAINT "CK_UnitPrice" CHECK (UnitPrice >= 0)
);

 CREATE  INDEX "OrderId" ON "Order_Details"("OrderId");
 CREATE  INDEX "OrdersOrder_Details" ON "Order_Details"("OrderId");
 CREATE  INDEX "ProductId" ON "Order_Details"("ProductId");
 CREATE  INDEX "ProductsOrder_Details" ON "Order_Details"("ProductId");