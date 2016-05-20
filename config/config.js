/**
 * Created by vamsi on 5/19/16.
 */

const path = require("path");
const _ = require("lodash");

const env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

const commonConfig = {
    root: path.normalize(path.join(__dirname, "/..")),
    client: {
        dir: 'client',
        main: 'index.html',
        webRTC: {
            mediaConstraints: {
                audio: true,
                video: true,
                content: true,
                data: true
            },
            iceServers: [
                {
                    'url': 'stun:stun.l.google.com:19302'
                }
            ]
        }
    },
    server:{

    }
};

const devConfig = {
    client:{
      loglevel: "debug"
    },
    server:{
        url:'localhost',
        httpPort:8080,
        httpsPort:8443,
        logLevel: "debug"
    },
    minimize: false
};

const prodConfig = {
    client:{
        logLevel: "info"
    },
    server:{
        url:'localhost',
        httpPort:80,
        httpsPort:443,
        logLevel: "info"
    },
    minimize: true
};

const testConfig = {
    client:{
        logLevel: "error"
    },
    server:{
        url:'localhost',
        httpPort:8000,
        httpsPort:8001,
        logLevel: "error"
    },
    minimize: true
};

let config;

if(process.env.NODE_ENV === 'development'){
    config = _.merge(commonConfig, devConfig);
}else if(process.env.NODE_ENV === 'production'){
    config = _.merge(commonConfig, prodConfig);
}else if(process.env.NODE_ENV === 'test'){
    config = _.merge(commonConfig, testConfig);
}

module.exports = config;

