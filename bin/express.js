const express = require('express')
const bodyParser = require("body-parser")


const adminRouter = require('../routes/admin-route')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/admin", adminRouter)
app.get("/", (req, res) => {
    res.send({ message: "teste" })
})