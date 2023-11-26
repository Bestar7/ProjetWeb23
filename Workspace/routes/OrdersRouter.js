const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Orders = require("../models/Orders")(sequelize, DataTypes)
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
    return Orders.create({...req.body});
  }).then((orders) => {
    res.json(orders)
  }).catch((err) => {
    console.log("error in POST /orders/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Orders.findAll(req.where);
  }).then((orders) => {
    res.json(orders)
  }).catch((err) => {
    console.log("error in GET /orders/\n  "+err)
  })
}

/** READ ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getOne(req, res){
  sequelize.authenticate()
  .then(() => {
    return Orders.findByPk(req.params.OrderId);
  }).then((orders) => {
    res.json(orders)
  }).catch((err) => {
    console.log("error in GET /orders/id\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    Orders.findAll(req.where)
    .then((result) => {
      Orders.destroy(req.where) // TODO verif destroy works
      return result
    }).then((orders) => {res.json(orders)})
  }).catch((err) => {
    console.log("error in DELETE /orders/id\n  "+err);
  })
}

/** DELETE ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteOne(req, res){
  // TODO CHECK all req.params
  const cndtn = {where : {...req.params }}
  sequelize.authenticate()
  .then(() => {
    Orders.findOne(cndtn)
    .then((result) => {
      Orders.destroy(cndtn)
      return result
    }).then((orders) => {
      res.json(orders)
    }).catch((err) => {
      console.log("error in DELETE /orders/id\n  "+err);
    })
  })
}

//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", (req, res) => getAll(req, res))

//READ WHERE
router.get("/cndtn", cndtnHandler, (req, res) => getAll(req, res))

//READ ONE
router.get("/:OrderId", (req, res) => {getOne(req, res)})

//DELETE ALL
router.delete("/", (req, res) => {deleteAll(req, res)})

//DELETE WHERE
router.delete("/cndtn", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE ONE
router.delete("/:OrderId", (req, res) => {deleteOne(req, res)})


module.exports = router;