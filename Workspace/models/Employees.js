const { Sequelize, DataTypes } = require('sequelize'); // pour l'auto-complete

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {Employees} DataTypes 
 * @returns
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employees', {
    EmployeeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    LastName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Title: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    TitleOfCourtesy: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    BirthDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    HireDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Region: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    PostalCode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Country: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    HomePhone: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    Extension: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    Photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ReportsTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Employees',
        key: 'EmployeeId'
      }
    },
    PhotoPath: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Employees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Employees_pkey",
        unique: true,
        fields: [
          { name: "EmployeeId" },
        ]
      },
      {
        name: "LastName",
        fields: [
          { name: "LastName" },
        ]
      },
    ]
  });
};
