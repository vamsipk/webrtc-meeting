/**
 * Created by vamsi on 5/11/16.
 */

class Message{
    constructor(fromUser, msg){
        this.id = fromUser.id;
        this.fromName = fromUser.name;
        this.text = msg;
        this.to = null;
    }

    getFromId(){
        return this.id;
    }

    getFromName(){
        return this.fromName;
    }

    getText(){
        return this.text;
    }

}

/*
function Message(fromUser, msg){
    return {
        id: fromUser.id,
        fromName: fromUser.name,
        text: msg
    }
}
*/

export default Message;
