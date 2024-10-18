"use strict";

const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));

module.exports = {
    "apps": [
        {
            "name": `dev:${config.APP_NAME}`,
            "script": "./index.js",
            "error_file": `./logs/pm2/dev.${config.APP_NAME}.error.log`,
            "max_memory_restart": "500M",
            "namespace": config.APP_NAME,
            "instances": "2",
            "watch": true,
            "ignore_watch": [
                "logs",
                "node_modules"
            ]
        }
    ]
};
