const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Customers = require("../models/Customers")(sequelize, DataTypes)
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
    return Customers.create({...req.body}, {logging: console.log});
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in POST /customers/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Customers.findAll(req.where)
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in GET /customers/\n  "+err)
  })
}

/** READ CONTAINS
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAllLitteral(req, res){
  sequelize.authenticate()
  .then(() => {
    return Customers.findAll({
      attributes : {
        include: [
          [sequelize.literal(`
            (SELECT c."CompanyName" 
            FROM "public"."Customers" c 
            WHERE c."CompanyName" LIKE '%cou%' 
            LIMIT 1)
          `), "Coucou Company Constante"]
        ]
      }
    })
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in GET /customers/\n  "+err)
  })
}

/** READ ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getOne(req, res){
  sequelize.authenticate()
  .then(() => {
    return Customers.findByPk(req.params.CustomerId);
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in GET /customers/\n  "+err)
  })
}

/** UPDATE ONE SQL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function updateOneSql(req, res){
  sequelize.authenticate()
  .then(() => {
    return Customers.findByPk(req.params.CustomerId);
  }).then((foundCust) => {
    foundCust.update({...req.body})
    return foundCust.save()
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in GET /customers/\n  "+err)
  })
}

/** UPDATE ONE JS
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function updateOneJs(req, res){
  sequelize.authenticate()
  .then(() => {
    return Customers.update(
      {...req.body},
      {where : {CustomerId: req.params.CustomerId}, returning: true },
    )
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in GET /customers/\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    Customers.findAll(req.where)
    .then((result) => {
      Customers.destroy(req.where) // TODO verif destroy works
      return result
    }).then((customers) => {res.json(customers)})
  }).catch((err) => {
    console.log("error in DELETE /customers/id\n  "+err);
  })
}

/** DELETE ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteOne(req, res){
  //const cndtn = {where : {...req.params }, returning}
  sequelize.authenticate()
  .then(() => {
    Customers.findOne(req.where)
    .then((result) => {
      return Customers.destroy(req.where)
      //return result
    }).then((customers) => {
      res.json(customers)
    }).catch((err) => {
    console.log("error in DELETE /customers/id\n  "+err);
    })
  })
}


//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", cndtnHandler, (req, res) => getAll(req, res))

//READ WHERE
router.get("/cndtn", cndtnHandler, (req, res) => getAll(req, res))

//READ ALL LITTERAL
router.get("/litteral", (req, res) => {getAllLitteral(req, res)})

//READ ONE
router.get("/:CustomerId", (req, res) => {getOne(req, res)})

//UPDATE ONE SQL
router.put("/sql/:CustomerId", (req, res) => {updateOneSql(req, res)})

//UPDATE ONE
router.put("/js/:CustomerId", (req, res) => {updateOneJs(req, res)})

//DELETE ALL
router.delete("/", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE WHERE
router.delete("/cndtn", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE ONE
router.delete("/:CustomerId", cndtnHandler, (req, res) => {deleteOne(req, res)})


module.exports = router;