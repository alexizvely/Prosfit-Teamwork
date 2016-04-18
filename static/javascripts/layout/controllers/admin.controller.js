(function () {
    'use strict';

    var AdminController = function AdminController(shapesData, $scope, Authentication, Projects) {
        var vm = this;
        vm.selectedCategory = '';
        vm.searchString = '';
        vm.countByCategory = [];

        shapesData.getShapes()
            .then(function(shapes) {
                vm.shapes = shapes.data;
            });

        Projects.getCategories()
            .then(function(categories){
                for (var i = 0; i < categories.length; i++) {
                    var categoryModel = {
                        name: categories[i],
                        count: vm.shapes.filter(function(project) {
                            return project.status == categories[i]
                        }).length
                    }

                    vm.countByCategory.push(categoryModel);
                }
            });

        vm.selectCategory = function(name) {
            if(vm.selectedCategory == name) {
                vm.selectedCategory = '';
            } else {
                vm.selectedCategory = name;
            }
        };
    };


    angular
        .module('pando-3d.layout.controllers')
        .controller('AdminController', ['shapesData', '$scope', 'Authentication', 'Projects', AdminController]);
}());
