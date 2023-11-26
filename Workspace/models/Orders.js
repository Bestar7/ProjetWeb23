const { Sequelize, DataTypes } = require('sequelize'); // pour l'auto-complete

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * @returns 
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    OrderId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Customers',
        key: 'CustomerId'
      }
    },
    EmployeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Employees',
        key: 'EmployeeId'
      }
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: true
    },

    RequiredDate: DataTypes.DATE,
    ShippedDate: DataTypes.DATE,

    Freight: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      defaultValue: 0
    },
    ShipName: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    ShipAddress: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    ShipCity: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    ShipRegion: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    ShipPostalCode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    ShipCountry: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "CustomerId",
        fields: [
          { name: "CustomerId" },
        ]
      },
      {
        name: "CustomersOrders",
        fields: [
          { name: "CustomerId" },
        ]
      },
      {
        name: "EmployeeId",
        fields: [
          { name: "EmployeeId" },
        ]
      },
      {
        name: "EmployeesOrders",
        fields: [
          { name: "EmployeeId" },
        ]
      },
      {
        name: "OrderDate",
        fields: [
          { name: "OrderDate" },
        ]
      },
      {
        name: "Orders_pkey",
        unique: true,
        fields: [
          { name: "OrderId" },
        ]
      },
      {
        name: "ShipPostalCode",
        fields: [
          { name: "ShipPostalCode" },
        ]
      },
      {
        name: "ShippedDate",
        fields: [
          { name: "ShippedDate" },
        ]
      },
    ]
  });
};
