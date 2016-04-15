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

    var ProjectsController = function ProjectsController(shapesData) {
        var vm = this;
        vm.shapes = shapesData.getShapes();
    };


    //angular
    //    .module('pando-3d.layout.controllers')
    //    .controller('ProjectsController', ProjectsController);
    angular
        .module('pando-3d.layout.controllers')
        .controller('ProjectsController', ['shapesData', ProjectsController]);
}());
