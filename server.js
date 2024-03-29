/*
// import modules
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require('http');

// configs
const { PORT } = require("./config/index");

// application level middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));


// server accessability
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



// main DB Connection
const db = require("./config/database")

// server status
app.get('/', (req, res) => {
    res.send(`<div align="center" style=""><h1> Server Ready For Requests. <h1><div>`);
});

// Routes permissions
require("./src/routes")(app)

// Create http server
const httpServer = http.createServer(app);

// Listner 
httpServer.listen(PORT, async () => {
    console.log("Server is running on PORT:", PORT);
})
*/
const express = require("express");
const createSocketServer = require("./socket");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const { PORT } = require("./config/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));

// server accessability
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// main DB Connection
const db = require("./config/database")

app.get('/', (req, res) => {
    res.send(`<div align="center" style=""><h1> Server Ready For Requests. <h1><div>`);
});

// Routes permissions
require("./src/routes")(app)

const { httpServer, io } = createSocketServer(app);

httpServer.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
