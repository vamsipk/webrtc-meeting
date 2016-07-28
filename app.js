/**
 * Created by vamsi on 5/5/16.
 */


const fs = require("fs");

const koa = require('./koa-ext');

const config = require('./config/config');

const rtcLogger = require('./shared/rtcLogger');
rtcLogger.setLogLevel(config.server.logLevel);

const app = koa();

const options = {
    cert: fs.readFileSync('./cert/cert.pem'),
    key: fs.readFileSync('./cert/key.pem')
};

/*app.httpListen(config.server.httpPort, () => {
    rtcLogger.info("Started http server on port: ", config.server.httpPort);
});*/

app.httpsListen(options, config.server.httpsPort, () => {
 rtcLogger.info("Started https server on port: ", config.server.httpsPort);
 });

const server = require('./server/server')(app, config);


app.on('error', (err, ctx) => {
    rtcLogger.error(err);
});
