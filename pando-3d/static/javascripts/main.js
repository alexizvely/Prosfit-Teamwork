(function() {
    'use strict';

    angular
        .module('pando-3d', [
            'pando-3d.config',
            'pando-3d.routes',
            'pando-3d.authentication',
            'pando-3d.layout'
        ]);

    angular
        .module('pando-3d.config', []);

    angular
        .module('pando-3d.routes', ['ngRoute']);

    angular
        .module('pando-3d')
        .run(run);

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();
