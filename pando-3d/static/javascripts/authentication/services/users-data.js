(function () {
    'use strict';

    var usersData = function usersData(mockUsers) {
        function getUsers() {
            return mockUsers.users;
        }

        return {
            getUsers: getUsers
        };
    };

    angular.module('pando3d.services')
        .factory('usersData', ['mockUsers', usersData]);
}());
