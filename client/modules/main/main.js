/**
 * Created by vamsi on 5/10/16.
 */

import angular from 'angular'
import uirouter from 'angular-ui-router'

import chatModule from '../chat/chat'
import connectModule from '../connect/connect'
import videoLayout from '../video-layout/videoLayout'

import mainPartial from './partial/main-partial.html'
import mainController from './partial/main-partial'

const main = angular.module('main', [uirouter, chatModule, videoLayout]);

main.config(function($stateProvider){
    'ngInject';
    $stateProvider.state('main', {
        url: '/main',
        template: mainPartial,
        controller: mainController,
        //reload: true,
        params:{

        }
    });
});


export default main.name;
