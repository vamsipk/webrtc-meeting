/**
 * Created by vamsi on 5/18/16.
 */

const winston = require('winston');

const rtcLogger = new winston.Logger({
    level: 'debug',
    transports: [
        new (winston.transports.Console)({

        })
    ]
});

rtcLogger.setLogLevel = function(level){
    rtcLogger.level = level;

};

module.exports = rtcLogger;