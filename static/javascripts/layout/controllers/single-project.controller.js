(function() {
    'use strict';

    var SingleProjectController = function SingleProjectController($scope, $routeParams, Authentication, singleShapesData, Projects) {
        var vm = this;
        var id = $routeParams.id;
        singleShapesData.getShape(id)
            .then(function(data) {
                vm.shape = data;


                var bar = $('.progress');
                var status = vm.shape.status;
                console.log(status);
                console.log(categories[0]);

                if (status == categories[0]) {
                    bar.val(10).addClass( "progress-danger" );
                } else if (status == categories[1]) {
                    bar.val(20).addClass( "progress-warning" );
                } else if (status == categories[2]) {
                    bar.val(30).addClass( "progress-info" );
                } else if (status == categories[3]) {
                    bar.val(60);
                } else {
                    bar.val(100).addClass( "progress-success" );
                }
            });
    };

    angular
        .module('pando-3d.layout.controllers')
        .controller('SingleProjectController', ['$scope', '$routeParams', 'Authentication', 'singleShapesData', 'Projects', SingleProjectController]);
}());
