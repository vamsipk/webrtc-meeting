/**
 * Created by vamsi on 5/5/16.
 */

const koa = require('koa');

const config = require('./config/config');

const rtcLogger = require('./shared/rtcLogger');
rtcLogger.setLogLevel(config.server.logLevel);

const app = koa();

const server = require('./server/server')(app, config);

app.listen(config.server.httpPort, function(){
    rtcLogger.info("Started server on port: ", config.server.httpPort);
});

app.on('error', (err, ctx) => {
    rtcLogger.error(err);
});
