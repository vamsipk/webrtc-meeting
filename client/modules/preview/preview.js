/**
 * Created by vamsi on 5/12/16.
 */

import angular from 'angular'
import uirouter from 'angular-ui-router'

import configModule from '../config/config'
import webRTCModule from '../webRTC/webRTC'

import previewPartial from './partial/preview-partial.html'
import previewController from './partial/preview-partial'
import previewService from './service/previewService'

const preview = angular.module('preview', [uirouter, configModule, webRTCModule]);
preview.service('previewService', previewService);

preview.config(function($stateProvider){
    'ngInject';
    $stateProvider.state('preview', {
        url: '/preview',
        template: previewPartial,
        controller: previewController,
        reload: true,
        params:{

        }
    });
});



export default preview.name;


