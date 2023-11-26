const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const OrderDetails = require("../models/Order_Details")(sequelize, DataTypes)
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
    return OrderDetails.create({...req.body});
  }).then((orderDetails) => {
    res.json(orderDetails)
  }).catch((err) => {
    console.log("error in POST /orderDetails/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return OrderDetails.findAll(req.where);
  }).then((orderDetails) => {
    res.json(orderDetails)
  }).catch((err) => {
    console.log("error in GET /orderDetails/\n  "+err)
  })
}

/** READ ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getOne(req, res){
  sequelize.authenticate()
  .then(() => {
    return OrderDetails.findOne({where:{...req.params}})
  }).then((orderDetails) => {
    res.json(orderDetails)
  }).catch((err) => {
    console.log("error in GET /orderDetails/one\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    OrderDetails.findAll(req.where)
    .then((result) => {
      OrderDetails.destroy(req.where) // TODO verif destroy works
      return result
    }).then((orderDetails) => {res.json(orderDetails)})
  }).catch((err) => {
    console.log("error in DELETE /orderDetails/id\n  "+err);
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
    OrderDetails.findOne(cndtn)
    .then((result) => {
      OrderDetails.destroy(cndtn)
      return result
    }).then((orderDetails) => {
      res.json(orderDetails)
    }).catch((err) => {
    console.log("error in DELETE /orderDetails/id\n  "+err);
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
router.get("/:OrderId/:ProductId", (req, res) => {getOne(req, res)})

//DELETE ALL
router.delete("/", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE WHERE
router.delete("/cndtn", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE ONE
router.delete("/:OrderId/:ProductId", (req, res) => {deleteOne(req, res)})


module.exports = router;