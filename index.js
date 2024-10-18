"use strict";

const path = require("path");
const process = require("process");
//const config = require(path.resolve(process.cwd(), "config"));
//const axios = require("axios");

const server = require(path.resolve(process.cwd(), "server"));

server.start();