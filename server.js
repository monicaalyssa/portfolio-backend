require('dotenv').config();
const express = require('express'),
    nodemailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const port = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(bodyParser.json());
