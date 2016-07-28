/**
 * Created by vamsi on 5/18/16.
 */

const IO = require('koa-socket');
const rtcLogger = require('../../shared/rtcLogger');

function meetingSocket(params){
    const meetingID = params.meetingID;

    const io = new IO({namespace: meetingID});

    const _ = require('lodash');

    const users = {};

    io.on('connection', ctx => {
        const socket = ctx.socket;
        const socketID = socket.id;

        rtcLogger.info("connection received: ", socketID);

        socket.emit('connected', socketID);
        rtcLogger.info("socket.handshake.query.userName: ", socket.handshake.query.userName);
        users[socketID] = {id: socketID, userName: socket.handshake.query.userName};

        const joinObj = _.clone(users[socketID]);

        const clientConfig = require('../../config/config').client;
        socket.emit('joined', clientConfig);
        socket.emit('users', users);
        socket.broadcast.emit( 'addUser', socketID, users[socketID]);

        socket.join('groupChat');
        socket.join('webRTCSignaling');

        socket.on('chatMessage', msg => {
            msg.from = socketID;
            const toID = msg.to;
            if(toID){
                socket.to(toID).emit('chatMessage', msg);
            }else{
                socket.to('groupChat').emit('chatMessage', msg);
            }

        });

        socket.on('error',(err) => {
            rtcLogger.error("error: ", socketID, err);
        });

        socket.on('disconnect',() => {
            rtcLogger.info("Disconnected: ", socketID);
            socket.broadcast.emit( 'removeUser', socketID);
            delete users[socketID];
        });

        socket.on('webRTCMessage', msg => {
            msg.from = socketID;
            const toID = msg.to;
            if(toID) {
                socket.to(toID).emit('webRTCMessage', msg);
            }else{
                socket.to('webRTCSignaling').emit('webRTCMessage', msg);
            }
        });

    });

    return io;
}


module.exports = meetingSocket;
