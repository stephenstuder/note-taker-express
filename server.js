const express = require("express");

const app = express();
const PORT = process.argv || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

