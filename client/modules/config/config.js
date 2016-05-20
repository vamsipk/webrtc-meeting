/**
 * Created by vamsi on 5/18/16.
 */

import angular from 'angular'

import configService from './service/configService'

const config = angular.module('rtcconfig', []);
config.service('configService', configService);

export default config.name;


