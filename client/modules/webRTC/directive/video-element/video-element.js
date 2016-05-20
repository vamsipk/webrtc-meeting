/**
 * Created by vamsi on 5/15/16.
 */

import templ from './video-element.html'

function videoElement(){
    return {
        restrict: 'E',
        template: templ,
        scope: {
            stream : "="
        },
        link: function(scope, element, attrs, fn) {
            const videoEl = element[0].querySelector('video');
            videoEl.srcObject = scope.stream;
        },
        controller: function($scope, $element, $attrs, $transclude) {

        }
    };
}

videoElement.$inject = [];

export default videoElement;