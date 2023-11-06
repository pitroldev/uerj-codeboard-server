const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Iniciando o App
const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

module.exports = app;


