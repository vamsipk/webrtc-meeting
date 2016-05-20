/**
 * Created by vamsi on 5/11/16.
 */

import angular from 'angular'
import templ from './chat-view.html'

function chatView(chatService) {
    return {
        restrict: 'E',
        template: templ,
        //templateUrl: 'chat-view.html',
        link: function(scope, element, attrs, fn) {

        },
        controller: function($scope, $element, $attrs, $transclude) {
            $scope.sendMessage = function(msg){
                chatService.sendGroupMessage($scope.selfMessage);
            }

            // performance
            $scope.$watchCollection(function(){
                return chatService.getGroupMessages();
            }, function(newList, oldList){
                $scope.groupMessages = newList;
            });

        }
    };
}

chatView.$inject = ['chatService'];

export default chatView;