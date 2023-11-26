var DataTypes = require("sequelize").DataTypes;
var _Employees = require("./Employees");
var _Customers = require("./Customers");
var _Order_Details = require("./Order_Details");
var _Orders = require("./Orders");
var _Products = require("./Products");

function initModels(sequelize) {
  var Employees = _Employees(sequelize, DataTypes);
  var Customers = _Customers(sequelize, DataTypes);
  var Order_Details = _Order_Details(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);

  Orders.belongsTo(Customers, { as: "Customer", foreignKey: "CustomerId"});
  Customers.hasMany(Orders, { as: "Orders", foreignKey: "CustomerId"});

  Employees.belongsTo(Employees, { as: "ReportsTo_Employee", foreignKey: "ReportsTo"});
  Employees.hasMany(Employees, { as: "Employees", foreignKey: "ReportsTo"});

  Orders.belongsTo(Employees, { as: "Employee", foreignKey: "EmployeeId"});
  Employees.hasMany(Orders, { as: "Orders", foreignKey: "EmployeeId"});

  return {
    Customers,
    Employees,
    Order_Details,
    Orders,
    Products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
