/**
 * Created by vamsi on 5/15/16.
 */

import angular from 'angular'

import webRTCModule from '../webRTC/webRTC'

import videoLayoutService from './service/videoLayoutService'
import videoLayoutVanilla from './directive/video-layout-vanilla'

const videoLayout = angular.module('videoLayout', [webRTCModule]);
videoLayout.service('videoLayoutService', videoLayoutService);

videoLayout.directive('videoLayoutVanilla', videoLayoutVanilla);


export default videoLayout.name;

