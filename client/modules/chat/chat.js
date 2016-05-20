import angular from 'angular';
import uirouter from 'angular-ui-router'

import connectModule from '../connect/connect'
import userModule from '../user/user'

import chatService from './service/chatService'
import chatView from './directive/chat-view/chat-view'
import chatMessage from './directive/chat-message/chat-message'

const chat = angular.module('chat', [uirouter, userModule, connectModule]);

chat.service('chatService', chatService);
chat.directive('chatView', chatView);
chat.directive('chatMessage', chatMessage);

export default chat.name;