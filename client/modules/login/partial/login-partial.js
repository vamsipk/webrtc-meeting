/**
 * Created by vamsi on 5/10/16.
 */

function loginController($scope, loginService, $state){
    $scope.userName = "vamsi";
    $scope.login = function(){
        loginService.login($scope.userName);
    }

    loginService.setLoginHandler(function(){
       $state.go('preview');
    });

}

loginController.$inject = ['$scope', 'loginService', '$state'];

export default loginController;