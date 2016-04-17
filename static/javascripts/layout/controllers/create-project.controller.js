(function () {
    'use strict';

    CreateProjectController.$inject = ['$location', '$scope', '$http', 'Authentication'];

    /**
     * @namespace CreateProjectController
     */
    function CreateProjectController($location, $scope, $http, Authentication) {
        var vm = this;

        vm.submitProject = submitProject;
        var divContainer = $('#svg-container');
        var s = Snap('#svg');

        //rect(x,y,width,height,rx,ry)
        var rect = s.rect(100,100,120,100,0,0).attr({ stroke: '#123456', 'strokeWidth': 2, fill: 'red', 'opacity': 0.2 });
        var rect1 = s.rect(100,100,120,100,0,0).attr({ stroke: '#123456', 'strokeWidth': 2, fill: 'red', 'opacity': 0.2 });
        // translate(100, 250) scale(2, 1)
        //rect.transform( 't100,250, S2,1');
        //circle(cx, cy, r)
        var circle = s.circle(50, 50, 40).attr({ stroke: '#123456', 'strokeWidth': 2, fill: 'red', 'opacity': 0.2});

        var file = '<?xml version=\"1.0\" standalone=\"no\"?>\r\n<!DOCTYPE svg PUBLIC \"-\/\/W3C\/\/DTD SVG 1.1\/\/EN\"\r\n \"http:\/\/www.w3.org\/Graphics\/SVG\/1.1\/DTD\/svg11.dtd\">\r\n <svg width=\"100%\" height=\"100%\"' + divContainer.children().html()+'<\/svg>';
        console.log(file);




        //Ext.Ajax.request({
        //    method: 'POST',
        //    url: 'localhost:8000/api/v1/projects/',
        //    jsonData: content.join('\r\n'),
        //    headers: {
        //        'Content-Type': 'multipart/form-data; boundary=' + file,
        //        'Content-Length': content.length
        //    }

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
                console.error(status);
                console.error(headers);
                console.error(config);
            }
        }
    }

    angular
        .module('pando-3d.layout.controllers')
        .controller('CreateProjectController', CreateProjectController);
}());
