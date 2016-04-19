(function() {
    'use strict';

    var SingleProjectController = function SingleProjectController($scope, $routeParams, Authentication, singleShapesData, Projects) {
        var vm = this;
        var id = $routeParams.id;
        singleShapesData.getShape(id)
            .then(function(data) {
                vm.shape = data;

                var categories = Projects.getCategories()
                    .then(function(categories) {
                        var bar = $('.progress');
                        //var status = vm.shape.status;
                        var status = 'sentForManufacturing';
                        console.log(status);
                        console.log(categories);

                        if (status == categories[0]) {
                            bar.val(10);
                            bar.addClass("progress-danger");
                        } else if (status == categories[1]) {
                            bar.val(20);
                            bar.addClass("progress-warning");
                        } else if (status == categories[2]) {
                            bar.val(30);
                            bar.addClass("progress-info");
                        } else if (status == categories[3]) {
                            bar.val(60);
                        } else {
                            bar.val(100);
                            bar.addClass("progress-success");
                        }
                    });
            });
    };

    angular
        .module('pando-3d.layout.controllers')
        .controller('SingleProjectController', ['$scope', '$routeParams', 'Authentication', 'singleShapesData', 'Projects', SingleProjectController]);
}());
