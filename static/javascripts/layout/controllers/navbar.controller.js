(function() {
    'use strict';

    var navbarController = function navbarController($location, $scope, $cookies, Authentication) {
        var vm = this;
        var show = false;

        vm.currentUser = {};

        waitForLogin();
        vm.logout = function logout() {
            Authentication.logout();
            vm.currentUser = undefined;
            waitForLogin();
            $location.path('/');
        };

        $('.nav a').on('click', function() {
            $('.navbar-toggle').click() //bootstrap 3.x by Richard
        });

        function waitForLogin() {
            if (Authentication.isAuthenticated()) {
                show = Authentication.isAdm();
                vm.currentUser = JSON.parse($cookies.authenticatedAccount);
                if(show){
                    $( ".admin-show").show();
                    $( ".user-show" ).hide();
                }else{
                    $( ".admin-show" ).hide();
                    $( ".user-show" ).show();
                }
                return vm.currentUser;
            }
        }
    };

    angular
        .module('pando-3d.layout.controllers')
        .controller('NavbarController', ['$location', '$scope', '$cookies', 'Authentication', navbarController]);
}());
