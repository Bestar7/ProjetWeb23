// called as next put every calling return->next.ppp
/** MIDDLEWARE cndtnHandler
 * @param {express.Request} req
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */ // TODO check param (Year) exist in Customer.Module
function cndtnHandler(req, res, next){
  var cndtn = { where : { }, returning: true}

  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      if (propName == "Pas Customer condition"){
        res.send(

        )
      }

      cndtn.where = {...cndtn.where, [propName] : req.query[propName]}
      console.log("condition = ", propName, req.query[propName]);
    }
  }

  req.where = cndtn
  next()
}

module.exports = {cndtnHandler}