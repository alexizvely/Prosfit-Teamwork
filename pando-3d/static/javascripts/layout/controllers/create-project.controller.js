(function () {
    'use strict';

    CreateProjectController.$inject = ['$location', '$scope', '$http', 'Authentication'];

    /**
     * @namespace CreateProjectController
     */
    function CreateProjectController($location, $scope, $http, Authentication) {
        var vm = this;

        vm.submitProject = submitProject;

        function submitProject(project, userid) {
            return $http.post('/api/v1/projects/', {
                    shapename: project.shapename,
                    color: project.color,
                    dimension_x: project.dimension_x,
                    dimension_y: project.dimension_y,
                    dimension_z: project.dimension_z,
                    status: 'saved',
                    shape_type: project.shape_type,
                    author_id: userid,
            }).then(createProjectSuccessFn, createProjectErrorFn);

            function createProjectSuccessFn(data, status, headers, config) {
                console.log('Project created')
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
    }

    angular
        .module('pando-3d.layout.controllers')
        .controller('CreateProjectController', CreateProjectController);
}());
