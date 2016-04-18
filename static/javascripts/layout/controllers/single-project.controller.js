(function() {
    'use strict';

    var SingleProjectController = function SingleProjectController($scope, $routeParams, Authentication, singleShapesData, Projects) {
        var vm = this;
        var id = $routeParams.id;
        singleShapesData.getShape(id)
            .then(function(data) {
                vm.shape = data;
            });
    };

    angular
        .module('pando-3d.layout.controllers')
        .controller('SingleProjectController', ['$scope', '$routeParams', 'Authentication', 'singleShapesData', 'Projects', SingleProjectController]);
}());
