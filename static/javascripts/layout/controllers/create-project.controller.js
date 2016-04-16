(function() {
    'use strict';

    CreateProjectController.$inject = ['$location', '$scope', '$http', 'Authentication'];

    /**
     * @namespace CreateProjectController
     */
    function CreateProjectController($location, $scope, $http, Authentication) {
        var vm = this;

        vm.submitProject = submitProject;

        function submitProject(project) {
            return $http.post('/api/v1/projects/', {
                author: Authentication.getAuthenticatedAccount().id,
                name: project.shapename,
                shape_type: project.shape_type,
                dimension_x: project.dimension_x,
                dimension_y: project.dimension_y,
                dimension_z: project.dimension_z,
                color: project.color,
                status: 'saved',
            }).then(createProjectSuccessFn, createProjectErrorFn);

            function createProjectSuccessFn(data, status, headers, config) {
                console.log('Project created');
                $location.url('/view/project');
            }

            function createProjectErrorFn(data, status, headers, config) {
                console.error(data);
            }
        }

        //vm.slider_toggle = {
        //    value: 100,
        //    options: {
        //        floor: 0,
        //        ceil: 500
        //    }
        //};

        //vm.refreshSlider = function () {
        //    $timeout(function () {
        //        $scope.$broadcast('rzSliderForceRender');
        //    });
        //};


        var s = Snap("#svgout");
        var cube = Snap.load("Cube.svg", function(loadedFragment) {
            s.append(loadedFragment);
        });
    }

    angular
        .module('pando-3d.layout.controllers')
        .controller('CreateProjectController', CreateProjectController);
}());
