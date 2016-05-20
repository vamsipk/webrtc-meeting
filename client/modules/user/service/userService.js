/**
 * Created by vamsi on 5/11/16.
 */

import User from './user'

class UserService{
    constructor(){
        this.users = {};
        this.userAddedHandlers = [];
        this.userRemovedHandlers = [];
    }

    getUser(id){
        return this.users[id];
    }

    getUsers(){
        return this.users;
    }

    addUser(id, obj){
        rtcLogger.info("addUser", id, obj);
        if(this.users[id]){
            // throw
            return;
        }
        const userObj = new User(obj);
        this.users[id] = userObj;
        this.userAddedHandlers.forEach(function(handler){
            handler(id);
        });
    }

    removeUser(id){
        rtcLogger.info("removeUser", id);
        if(this.users[id]){
            delete this.users[id];
            this.userRemovedHandlers.forEach(function(handler){
                handler(id);
            });
        }
    }

    setUserAddedHandler(handler){
        this.userAddedHandlers.push(handler);
    }

    setUserRemovedHandler(handler){
        this.userRemovedHandlers.push(handler);
    }

    getUsersSorted(){

    }

}

export default UserService;