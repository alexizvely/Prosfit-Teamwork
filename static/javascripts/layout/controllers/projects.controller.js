(function() {
    'use strict';

    var ProjectsController = function ProjectsController($scope, Authentication, shapesData, Projects) {
        var vm = this;
        vm.selectedCategory = '';
        vm.searchString = '';
        vm.countByCategory = [];
        vm.shapes = [];
        var categoriesBeautified = [
            'Saved',
            'Sent for Manufacturing, Awaiting approval',
            'Returned for improvements',
            'Sent for Manufacturing, Approved',
            'Manufactured'
        ];
        vm.prettyShapes = [];

        shapesData.getUserShapes()
            .then(function(data) {
                data.data.forEach(function(shape) {
                    vm.shapes.push(shape);
                });
                return Projects.getCategories();
            })
            .then(function(categories) {
                for (var i = 0; i < categories.length; i++) {

                    var categoryModel = {
                        serverName: categories[i],
                        name: categoriesBeautified[i],
                        count: vm.shapes.filter(function(project) {
                            return project.status == categories[i]
                        }).length
                    };

                    vm.countByCategory.push(categoryModel);

                    //////////////////Pretify///
                    for (var i = 0; i < vm.shapes.length; i++) {
                        var status = vm.shapes[i].status;
                        var figurePretty = '';
                        var statusPretty = '';
                        if(vm.shapes[i].shape_type == 'cu'){
                            figurePretty = 'Cube';
                        }else if(vm.shapes[i].shape_type == 'po'){
                            figurePretty = 'Cuboid';
                        }else{
                            figurePretty = 'Sphere';
                        }

                        if (status == categories[0]) {
                            statusPretty = categoriesBeautified[0];
                        } else if (status == categories[1]) {
                            statusPretty = categoriesBeautified[1];
                        } else if (status == categories[2]) {
                            statusPretty = categoriesBeautified[2];
                        } else if (status == categories[3]) {
                            statusPretty = categoriesBeautified[3];
                        } else {
                            statusPretty = categoriesBeautified[4];
                        }

                        var prettyShape = {
                            name: vm.shapes[i].name,
                            color: vm.shapes[i].color,
                            dimension_x: vm.shapes[i].dimension_x,
                            dimension_y: vm.shapes[i].dimension_y,
                            dimension_z: vm.shapes[i].dimension_z,
                            shape_type: vm.shapes[i].shape_type,
                            status: vm.shapes[i].status,
                            svgText: vm.shapes[i].svgText,
                            id: vm.shapes[i].id,
                            figurePretty: figurePretty,
                            statusPretty: statusPretty,
                            prettyCreateDate: prettyDate(vm.shapes[i].created_at),
                            prettyLastUpdateDate: prettyDate(vm.shapes[i].updated_at),
                        }

                        vm.prettyShapes.push(prettyShape);
                    }



                    //////////////////Pretify///
                }

            });

        //////////////Pretty
        function prettyDate(time){
            var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
                diff = (((new Date()).getTime() - date.getTime()) / 1000),
                day_diff = Math.floor(diff / 86400);

            if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
                return;

            return day_diff == 0 && (
                diff < 60 && "just now" ||
                diff < 120 && "1 minute ago" ||
                diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
                diff < 7200 && "1 hour ago" ||
                diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
                day_diff == 1 && "Yesterday" ||
                day_diff < 7 && day_diff + " days ago" ||
                day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
        }

        vm.selectCategory = function(name) {
            if (vm.selectedCategory == name) {
                vm.selectedCategory = '';
            } else {
                vm.selectedCategory = name;
            }
        };
    };

    angular
        .module('pando-3d.layout.controllers')
        .controller('ProjectsController', ['$scope', 'Authentication', 'shapesData', 'Projects', ProjectsController]);
}());
