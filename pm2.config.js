"use strict";

const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));

module.exports = {
    "apps": [
        {
            "name": `${config.APP_NAME}`,
            "script": "./index.js",
            "error_file": `./logs/pm2/${config.APP_NAME}.error.log`,
            "max_memory_restart": "500M",
            "namespace": config.APP_NAME,
            "instances": "2",
            "env": {
                "NODE_ENV": "production",
            }
        }
    ]
};
