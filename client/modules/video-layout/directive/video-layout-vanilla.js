/**
 * Created by vamsi on 5/15/16.
 */

import templ from './video-layout-vanilla.html'

function videoLayoutVanilla(videoLayoutService) {
    return {
        restrict: 'E',
        template: templ,
        link: function(scope, element, attrs, fn) {
        },
        controller: function($scope, $element, $attrs, $transclude) {
            $scope.$watchCollection(function(){
                return videoLayoutService.getRemoteStreams();
            }, function(newList, oldList){
                $scope.remoteStreams = newList;
            });

            $scope.localStream = videoLayoutService.getLocalStream();
        }
    };
}

videoLayoutVanilla.$inject = ['videoLayoutService'];

export default videoLayoutVanilla;
