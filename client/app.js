/**
 * Created by vamsi on 5/6/16.
 */

//import Connect from 'connect'

import angular from 'angular'
import uirouter from 'angular-ui-router'
import loginModule from './modules/login/login'
import previewModule from './modules/preview/preview'
import mainModule from './modules/main/main'

const app = angular.module('webRTCApp', [uirouter, loginModule, previewModule, mainModule]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
});

app.run(['$rootScope', '$location', 'loginService',function($rootScope, $location, loginService) {
    rtcLogger.info("App running");
    $rootScope.$on('$stateChangeStart', function(event){
        if(!loginService.isLoggedIn()){
            $location.path('/login');
        }
    });

}]);


export default app.name;