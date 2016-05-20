/**
 * Created by vamsi on 5/11/16.
 */

class User{
    constructor(userObj){
        this.id = userObj.id;
        this.type = userObj.type;
        this.name = userObj.userName;
        this.email = userObj.email;
    }

    getId(){
        return this.id;
    }

    getType(){
        return this.type;
    }

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }
}

export default User;
