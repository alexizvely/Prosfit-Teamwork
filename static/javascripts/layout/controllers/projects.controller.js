(function () {
    'use strict';

    var ProjectsController = function ProjectsController($scope, Authentication, shapesData, Projects) {
        var vm = this;
        shapesData.getShapes()
            .then(function(data){
                console.log(data.data);
                    vm.shapes = data.data;
                console.log(vm.shapes);
            });


        vm.selectedCategory = '';
        vm.searchString = '';
        vm.countByCategory = [];

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
        .controller('ProjectsController', ['$scope', 'Authentication', 'shapesData', 'Projects', ProjectsController]);
}());
