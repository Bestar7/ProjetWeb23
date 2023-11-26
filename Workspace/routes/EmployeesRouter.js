const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Employees = require("../models/Employees")(sequelize, DataTypes)
const { cndtnHandler } = require('./MiddleWare')

var router = express.Router()

/** CREATE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function createOne(req, res){
  // TODO req.body.eachField != null
  sequelize.authenticate()
  .then(() => {
    return Employees.create({...req.body});
  }).then((employees) => {
    res.json(employees)
  }).catch((err) => {
    console.log("error in POST /employees/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Employees.findAll(req.where);
  }).then((employees) => {
    res.json(employees)
  }).catch((err) => {
    console.log("error in GET /employees/\n  "+err)
  })
}

/** READ ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getOne(req, res){
  sequelize.authenticate()
  .then(() => {
    return Employees.findByPk(req.params.EmployeeId);
  }).then((employees) => {
    res.json(employees)
  }).catch((err) => {
    console.log("error in GET /employees/id\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    Employees.findAll(req.where)
    .then((result) => {
      Employees.destroy(req.where) // TODO verif destroy works
      return result
    }).then((employees) => {res.json(employees)})
  }).catch((err) => {
    console.log("error in DELETE /employees/\n  "+err)
  })
}

/** DELETE ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteOne(req, res){
  const cndtn = {where : {...req.params }}
  sequelize.authenticate()
  .then(() => {
    Employees.findOne(cndtn)
    .then((result) => {
      Employees.destroy(cndtn)
      return result
    }).then((employees) => {
      res.json(employees)
    }).catch((err) => {
    console.log("error in DELETE /employees/id\n  "+err);
    })
  })
}

//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", cndtnHandler, (req, res) => getAll(req, res))

//READ ALL WHERE
router.get("/cndtn", cndtnHandler, (req, res) => getAll(req, res))

//READ ONE
router.get("/:EmployeeId", (req, res) => {getOne(req, res)})

//DELETE ALL
router.delete("/", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE ALL
router.delete("/cndtn", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE ONE
router.delete("/:EmployeeId", (req, res) => {deleteOne(req, res)})


module.exports = router;