/**
 * Created by vamsi on 5/10/16.
 */

import angular from 'angular'
import uirouter from 'angular-ui-router'

import connectModule from '../connect/connect'

import loginService from './service/loginService'
import loginPartial from './partial/login-partial.html'
import loginController from './partial/login-partial'

const login = angular.module('login', [uirouter, connectModule]);//.service('loginService', loginService);
login.service('loginService', loginService);

login.config(function($stateProvider){
    'ngInject';
    $stateProvider.state('login', {
        url: '/login',
        template: loginPartial,
        controller: loginController,
        //reload: true,
        params:{

        }
    });
});

export default login.name;
