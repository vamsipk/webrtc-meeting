/**
 * Created by vamsi on 5/10/16.
 */

import angular from 'angular'
import connectService from './service/connectService'

import userModule from '../user/user'
import configModule from '../config/config'

const connect = angular.module('connect', [userModule, configModule]);

connect.service('connectService', connectService);

connect.run(function(){

});

export default connect.name;

