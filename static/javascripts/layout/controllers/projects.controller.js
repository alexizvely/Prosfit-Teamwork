(function () {
    'use strict';

    //ProjectsController.$inject = ['$scope', 'Authentication'];
    //
    ///**
    // * @namespace ProjectsController
    // */
    //function ProjectsController($scope, Authentication) {
    //    var vm = this;
    //
    //
    //}

    var ProjectsController = function ProjectsController($scope, Authentication, shapesData) {
        var vm = this;
        shapesData.getShapes()
            .then(function(data){
                vm.shapes = data;
            });
    };


    //angular
    //    .module('pando-3d.layout.controllers')
    //    .controller('ProjectsController', ProjectsController);
    angular
        .module('pando-3d.layout.controllers')
        .controller('ProjectsController', ['$scope', 'Authentication', 'shapesData', ProjectsController]);
}());
