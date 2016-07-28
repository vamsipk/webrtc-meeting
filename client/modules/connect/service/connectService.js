/**
 * Created by vamsi on 5/10/16.
 */

import io from 'socket.io-client'

class ConnectService{
    constructor(userService, configService){
        this.userService = userService;
        this.configService = configService;

        this.joinHandlers = [];
        this.chatMessageHandlers = [];
        this.webRTCMessageHandlers = [];
    }

    connect(url, params){
        let queryStr = "";
        const keys = Object.keys(params);
        const len = keys.length;
        keys.forEach((key,index) => {
            queryStr += key+"="+params[key];
            if(index != len-1){
                queryStr +=",";
            }
        });
        this.socket = io(url, {"query": queryStr, secure: true});

        this.socket.on("connect", () => {
            rtcLogger.info("Socket connected: ", this.socket.id);
        });
        this.socket.on("connect_error", function(err){
            rtcLogger.error("connect_error: ", err);
        });
        this.socket.on("reconnect", function(numAttempts){
            rtcLogger.info("reconnected after attempts: ", numAttempts);
        });
        this.socket.on("connect_timeout", function(){
            rtcLogger.info("connect_timeout");
        });

        this.socket.on("connected", this.onConnect.bind(this));
        this.socket.on("joined", this.onJoin.bind(this));
        this.socket.on("addUser", this.onUserAdded.bind(this));
        this.socket.on("removeUser", this.onUserRemoved.bind(this));

        this.socket.on("chatMessage", this.onChatMessage.bind(this));

        this.socket.on('webRTCMessage', this.onWebRTCMessage.bind(this));
    }

    setJoinHandler(handler){
        this.joinHandlers.push(handler);
    }

    onConnect(id){
        rtcLogger.debug("Connected from server: ", id);
        this.socketID = id;
    }

    onJoin(config){
        this.configService.setConfig(config);
        for(let i=0; i< this.joinHandlers.length; i++){
            this.joinHandlers[i]();
        }
    }

    onUserAdded(id, userObj){
        this.userService.addUser(id, userObj);
    }

    onUserRemoved(id){
        this.userService.removeUser(id);
    }

    setChatMessageHandler(handler){
        this.chatMessageHandlers.push(handler);
    }

    sendChatMessage(msg){
        this.socket.emit('chatMessage', msg);
    }

    onChatMessage(msg){
        this.chatMessageHandlers.forEach((handler) => {
            handler(msg);
        });
    }

    setWebRTCMessageHandler(handler){
        this.webRTCMessageHandlers.push(handler);
    }

    sendWebRTCMessage(message){
        message.from = this.socketID;
        this.socket.emit('webRTCMessage', message);
    }

    onWebRTCMessage(msg){
        this.webRTCMessageHandlers.forEach((handler) =>{
            handler(msg);
        });
    }
}

ConnectService.$inject = ['userService', 'configService'];

export default ConnectService;
