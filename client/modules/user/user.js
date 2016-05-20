/**
 * Created by vamsi on 5/11/16.
 */

import angular from 'angular'

import userService from './service/userService'

const user = angular.module('user', []);
user.service('userService', userService);

export default user.name;
