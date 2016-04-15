(function () {
    'use strict';

    //SingleProjectController.$inject = ['$scope', 'Authentication'];
    //
    ///**
    // * @namespace SingleProjectController
    // */
    //function SingleProjectController($scope, Authentication) {
    //    var vm = this;
    //
    //
    //}

    var SingleProjectController = function SingleProjectController(mockSingleShape) {
        var vm = this;
        vm.shapes = mockSingleShape.getShape();
    };


    //angular
    //    .module('pando-3d.layout.controllers')
    //    .controller('SingleProjectController', SingleProjectController);
    angular
        .module('pando-3d.layout.controllers')
        .controller('SingleProjectController', ['mockSingleShape', SingleProjectController]);
}());