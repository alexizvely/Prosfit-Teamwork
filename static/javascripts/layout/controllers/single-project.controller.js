(function () {
    'use strict';

    var SingleProjectController = function SingleProjectController($scope, Authentication, singleShapesData, Projects) {
        var vm = this;
        singleShapesData.getShape()
            .then(function(data){
                vm.shapes = data;
            });
    };

    angular
        .module('pando-3d.layout.controllers')
        .controller('SingleProjectController', ['$scope', 'Authentication', 'singleShapesData', 'Projects', SingleProjectController]);
}());