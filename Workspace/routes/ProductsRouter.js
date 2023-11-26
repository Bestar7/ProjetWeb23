const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Products = require("../models/Products")(sequelize, DataTypes)
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
    return Products.create({...req.body});
  }).then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log("error in POST /products/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Products.findAll(req.where)
  }).then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log("error in GET /products/\n  "+err)
  })
}

/** READ ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getOne(req, res){
  sequelize.authenticate()
  .then(() => {
    return Products.findByPk(req.params.ProductId);
  }).then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log("error in GET /products/\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
    sequelize.authenticate()
  .then(() => {
    Products.findAll(req.where)
    .then((result) => {
      Products.destroy(req.where)
       // TODO verif destroy works
      return result
    }).then((products) => {res.json(products)})
  }).catch((err) => {
    console.log("error in DELETE /products/id\n  "+err);
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
    Products.findOne(cndtn)
    .then((result) => {
      Products.destroy(cndtn)
      return result
    }).then((products) => {
      res.json(products)
    }).catch((err) => {
    console.log("error in DELETE /products/id\n  "+err);
    })
  })
}


//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", cndtnHandler, (req, res) => getAll(req, res))

//READ WHERE
router.get("/cndtn", cndtnHandler, (req, res) => getAll(req, res))

//READ ONE
router.get("/:ProductId", (req, res) => {getOne(req, res)})

//DELETE ALL
router.delete("/", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE WHERE
router.delete("/cndtn", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE ONE
router.delete("/:ProductId", (req, res) => {deleteOne(req, res)})


module.exports = router;