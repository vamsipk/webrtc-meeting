/**
 * Created by vamsi on 5/10/16.
 */

import Message from '../../message/message'

class chatService{
    constructor($rootScope, connectService, userService){
        this.$rootScope = $rootScope;
        this.connectService = connectService;
        this.userService = userService;

        this.connectService.setChatMessageHandler(this.onChatMessage.bind(this));

        this.userService.setUserAddedHandler(this.onUserAdded.bind(this));
        this.userService.setUserRemovedHandler(this.onUserRemoved.bind(this));

        this.groupMessages = [];
        this.privateMessages = [];
    }

    sendChatMessage(msg){
        this.connectService.sendChatMessage(msg);
    }

    sendGroupMessage(msg){
        rtcLogger.trace("sendGroupMessage: ", msg);
        if(!msg){
            return;
        }
        const message = Message('group', msg);
        this.sendChatMessage(message);
    }

    sendPrivateMessage(id, msg){
        if(!id || !msg){
            return;
        }
        const message = Message('private', msg, id);
        this.sendChatMessage(message);
    }

    onChatMessage(msg){
        rtcLogger.trace("onChatMessage: ", msg);
        if(msg.to){
            this.onPrivateMessage(msg);
        }else{
            this.onGroupMessage(msg);
        }
    }

    onGroupMessage(message){
        rtcLogger.trace("onGroupMessage: ", message);
        const userObj = this.userService.getUser(message.from); // get name
        this.groupMessages.push(message);

        this.$rootScope.$evalAsync(); // this or more boilerplate callbacks to controller?
    }

    onPrivateMessage(message){
        rtcLogger.debug("onPrivateMessage: ", message);
        const userObj = this.userService.getUser(message.from);
        this.privateMessages.push(message);

        this.$rootScope.$evalAsync(); // this or more boilerplate callbacks to controller?
    }

    getUsers(){
        return this.userService.getUsers();
    }

    onUserAdded(id){

    }

    onUserRemoved(id){

    }

    getPrivateMessages(){
        return this.privateMessages;
    }

    getGroupMessages(){
        return this.groupMessages;
    }


}

chatService.$inject = ['$rootScope', 'connectService', 'userService'];

export default chatService;
