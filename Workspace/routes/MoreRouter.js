const express = require("express")
const { sequelize, QueryTypes, DataTypes} = require("../util/database")
const Customers = require("../models/Customers")(sequelize, DataTypes)

var router = express.Router()

/** CREATE ONE TRANSACTION
 * @param {express.Request} req
 * @param {express.Response} res 
 */
async function createOne(req, res){
  // TODO req.body.eachField != null
  const tran = await sequelize.transaction();
  try {
    const cust = await Customers.create({...req.body}, {transaction: tran});
    const custFail = await Customers.create({CustomerId: 1, ...req.body}, {transaction: tran});

    await tran.commit()
  } catch(err){
    console.log("error in POST transaction /more/\n  "+err)
    await tran.rollback()
  }
}

/** READ ALL RAW QUERY
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    const cust = sequelize.query(`
      SELECT * 
      FROM "public"."Customers" 
      WHERE "CustomerId" = :id 
    `, {
      replacements: { id: 2 },
      //type: QueryTypes.SELECT,
      model: Customers,
      mapToModel: true,
    })
    return cust;
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in GET /more/\n  "+err)
  })
}

//CREATE ONE TRANSACTION
router.post("/", (req, res) => createOne(req, res))

//READ ONE RAW QUERY
router.get("/", (req, res) => {getAll(req, res)})


module.exports = router;