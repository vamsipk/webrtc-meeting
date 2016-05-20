/**
 * Created by vamsi on 5/12/16.
 */

import angular from 'angular'
import connectModule from '../connect/connect'
import userModule from '../user/user'

import webRTCService from './service/webRTCService'
import html5src from './directive/html5src'
import videoElement from './directive/video-element/video-element'

const webrtc = angular.module('webrtc', [connectModule, userModule]);
webrtc.service('webRTCService', webRTCService);
webrtc.directive('html5src', html5src);
webrtc.directive('videoElement', videoElement);

export default webrtc.name;

