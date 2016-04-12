(function () {
    'use strict';

    var baseurl = '/api/v1/';

    var baseData = function baseData($http, $q, Authentication) {
        var headers = {
                'Content-Type': 'application/json'
            },
            authorizationErrorMessage = 'You must be logged in to do that';

        function get(url, authorize) {
            var deferred = $q.defer();

            if (authorize && !identity.isAuthenticated()) {
                notifier.error(authorizationErrorMessage);
                deferred.reject();
            }
            else {
                var URL = baseurl + url;

                $http.get(URL)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        }

        function post(url, data, authorize) {
            var deferred = $q.defer();

            if (authorize && !identity.isAuthenticated()) {
                notifier.error(authorizationErrorMessage);
                deferred.reject();
            }
            else {
                var URL = baseurl + url;

                $http.post(URL, data, headers)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        }

        function put(url, data, authorize) {
            var deferred = $q.defer();

            if (authorize && !identity.isAuthenticated()) {
                notifier.error(authorizationErrorMessage);
                deferred.reject();
            }
            else {
                var URL = baseurl + url;

                $http.put(URL, data, headers)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        }

        return {
            get: get,
            put: put,
            post: post
        };
    };

    angular
        .module('pando-3d.common.services')
        .factory('data', ['$http', '$q', 'Authentication', baseData]);
}());