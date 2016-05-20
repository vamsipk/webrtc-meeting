/**
 * Created by vamsi on 5/20/16.
 */

const serve = require('koa-static');
const rewrite = require('koa-rewrite');
const router = require('koa-router')();
const fs = require("fs");
const compress = require('koa-compress');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');

const rtcLogger = require('../shared/rtcLogger');

function server(app, config){

    const clientDir = config.root+"/"+config.client.dir;
    const clientFile = config.client.main;

    app.use(compress());
    app.use(conditional());
    app.use(etag());
    app.use(serve(clientDir));

    const readFileThunk = function() {
        return new Promise(function (resolve, reject) {
            fs.readFile(clientFile, function (err, data) {
                if(err) return reject(err);
                resolve(data);
            });
        });
    };

    app.use(function *(next){
        this.body = readFileThunk();
    });

    // use meeting manager later
    const meetingSocket = require('./meeting/meetingSocket')({meetingID: "/"});
    meetingSocket.attach(app);
};

module.exports = server;
