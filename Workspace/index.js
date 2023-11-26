const express = require("express")
const app = express()
app.use(express.json())

/*
const morgan = require('morgan')
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body ')
morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})
app.use(logger)
*/

const CONFIG = require('./config/config.json')

const PORT = CONFIG.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const OrdersDetailsRouter = require('./routes/OrdersDetailsRouter')
app.use('/order-details', OrdersDetailsRouter)

const EmployeesRouter = require('./routes/EmployeesRouter')
app.use('/employees', EmployeesRouter)

const CustomersRouter = require('./routes/CustomersRouter')
app.use('/customers', CustomersRouter)

const OrdersRouter = require('./routes/OrdersRouter')
app.use('/orders', OrdersRouter)

const ProductsRouter = require('./routes/ProductsRouter')
app.use('/products', ProductsRouter)

const MoreRouter = require('./routes/MoreRouter')
app.use('/more', MoreRouter)