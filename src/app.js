const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Iniciando o App
const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

module.exports = app;

const baseDir = "../uerj-codeboard-site/build";
app.use('/build/', express.static(baseDir));
app.use('/build/static/js/', express.static(baseDir + "/static/js"));
app.use('/build/static/media/', express.static(baseDir + "/static/media"));
app.use('/build/manifest.json', express.static(baseDir + "/manifest.json"));
app.use('/build/favicon.ico', express.static(baseDir + "/favicon.ico"));
