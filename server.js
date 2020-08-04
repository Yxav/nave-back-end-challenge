const express = require('express')
const bodyParser = require("body-parser")

const adminRouter = require('./routes/admin-routes')
const naverRouter = require('./routes/naver-routes')
const projectRouter = require('./routes/project-routes')
const auth = require("./middlewares/authenticate")


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = [
    naverRouter,
    projectRouter
]

app.use("/api/", adminRouter)
app.use("/api/admin", auth.authorize, routes)



app.listen(3333)