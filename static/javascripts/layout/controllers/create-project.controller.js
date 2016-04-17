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

        var rect1_x = 20;
        var rect1_y = 90;
        var z= 15;
        var rect2_x = 60;
        //var middle = z.pow(2)+ rect1_x.pow(2) + rect1_y.pow(2) - rect2_x.pow(2);
        var rect2_y = Math.sqrt(Math.abs(Math.pow(z,2)+ Math.pow(rect1_x,2) + Math.pow(rect1_y,2) - Math.pow(rect2_x,2)));

        var width= 180;
        var height = 240;
        var end1 = rect2_x-rect1_x;
        var end2 = rect2_y-rect1_y;
        var start1 = width+rect1_x;
        var start2= height+rect1_y;

        var path = 'M' + rect1_x + ','+rect1_y + ' l'+end1 + ','+end2 +' M'+ start1+ ','+rect1_y + ' l'+end1 + ','+end2 +' M'+ rect1_x+','+ start2 +  ' l'+end1 + ','+end2 +' M'+
            start1+','+ start2+ ' l'+end1 + ','+end2;
        console.log(path);

        var startPointRect3_x = rect1_x;
        var startPointRect3_y = rect1_y;
        var point2Rect3_y = rect2_y-rect1_y;
        var startPointRect3_x_3rdPoint=startPointRect3_x - z; //or width
        var y2 = startPointRect3_y - point2Rect3_y;
        var y3 = y2 + height; //or width
        var y4 = y3 + point2Rect3_y;

        var pointsRect3 = '"'+startPointRect3_x+' '+startPointRect3_y+' '+
                                startPointRect3_x_3rdPoint+' ' +y2+' '+
                                startPointRect3_x_3rdPoint+' ' + y3   +' '+
                                startPointRect3_x+ ' '+ y4 + ' ' +
                                startPointRect3_x+' '+startPointRect3_y +'"';
        console.log(pointsRect3);

        var startPointRect4_x = rect1_x + width;
        var startPointRect4_y = rect1_y;
        var point2Rect4_y = rect2_y-rect1_y;
        var startPointRect4_x_3rdPoint=startPointRect4_x - z; //or width
        y2 = startPointRect4_y - point2Rect4_y;
        y3 = y2 + height; //or width
        y4 = y3 + point2Rect4_y;

        var pointsRect4 = '"'+startPointRect4_x+' '+startPointRect4_y+' '+
            startPointRect4_x_3rdPoint+' ' +y2+' '+
            startPointRect4_x_3rdPoint+' ' + y3   +' '+
            startPointRect4_x+ ' '+ y4 + ' ' +
            startPointRect4_x+' '+startPointRect4_y +'"';
        console.log(pointsRect4);

        var startPointRect5_x = rect1_x;
        var startPointRect5_y = rect1_y;
        var point2Rect5_y = startPointRect4_y;
        var startPointRect5_x_3rdPoint=startPointRect5_x + width; //height or width
        y2 = startPointRect5_y - point2Rect5_y;
        y3 = y2 + width; //or height or z
        y4 = y3 + point2Rect5_y;

        var pointsRect5 = '"'+startPointRect5_x+' '+startPointRect5_y+' '+
            startPointRect5_x_3rdPoint+' ' +y2+' '+
            startPointRect5_x_3rdPoint+' ' + y3   +' '+
            startPointRect5_x+ ' '+ y4 + ' ' +
            startPointRect5_x+' '+startPointRect5_y +'"';
        console.log(pointsRect5);










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
