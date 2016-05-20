/**
 * Created by vamsi on 5/10/16.
 */

//import connectService from '../../connect/service/connectService'

class LoginService{
    constructor(connectService){
        this.connectService  = connectService;
        this.loggedIn = false;
    }

    login(userName){
        this.connectService.connect("/", {"userName": userName});
    }

    isLoggedIn(){
        return this.loggedIn;
    }

    setLoginHandler(handler){
        this.loggedIn = true;
        this.connectService.setJoinHandler(handler);
    }
}


LoginService.$inject = ['connectService'];
export default LoginService;