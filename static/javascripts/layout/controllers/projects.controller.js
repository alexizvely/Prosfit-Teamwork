(function() {
    'use strict';

    var ProjectsController = function ProjectsController($scope, Authentication, shapesData, Projects) {
        var vm = this;
        vm.selectedCategory = '';
        vm.searchString = '';
        vm.countByCategory = [];
        vm.shapes = [];

        shapesData.getShapes()
            .then(function(data) {
                data.data.forEach(function(shape) {
                    vm.shapes.push(shape);
                });
                // vm.shapes = data.data;
                console.log(data.data);
                return Projects.getCategories();
            })
            .then(function(categories) {
                console.log(vm);
                for (var i = 0; i < categories.length; i++) {
                    var categoryModel = {
                        name: categories[i],
                        count: vm.shapes.filter(function(project) {
                            return project.status == categories[i]
                        }).length
                    };

                    vm.countByCategory.push(categoryModel);
                }

            });




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
