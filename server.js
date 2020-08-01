const express = require('express')
const bodyParser = require("body-parser")

const adminRouter = require('./routes/admin-routes')
const naverRouter = require('./routes/naver-routes')
const productRouter = require('./routes/product-routes')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = [
    adminRouter,
    naverRouter,
    productRouter
]
app.use("/api/admin", routes)


app.listen(3333)