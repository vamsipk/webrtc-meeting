import angular from 'angular'

require.ensure([], function (require) {
    var angular = require('angular');

    const webRTCApp = require('./app');
    // run app
    angular.bootstrap(document, ['webRTCApp']);
});