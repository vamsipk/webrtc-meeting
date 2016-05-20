/**
 * Created by vamsi on 5/11/16.
 */

import templ from './chat-message.html'

function chatMessage(chatService) {
    return {
        restrict: 'E',
        template: templ,
        scope: {
            message: "="
        },
        //templateUrl: 'chat-message.html',
        link: function(scope, element, attrs, fn) {

        },
        controller: function($scope, $element, $attrs, $transclude) {

        }
    };
}

export default chatMessage;
