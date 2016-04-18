(function () {
    'use strict';

    CreateProjectController.$inject = ['$location', '$scope', '$http', 'Authentication', 'notifier'];

    /**
     * @namespace CreateProjectController
     */
    function CreateProjectController($location, $scope, $http, Authentication, notifier) {
        var vm = this;

        vm.submitProject = submitProject;
        var divContainer = $('#svg-container');
        //var s = Snap('#svg');

        //rect(x,y,width,height,rx,ry)
        //var rect = s.rect(100,100,120,100,0,0).attr({ stroke: '#123456', 'strokeWidth': 2, fill: 'red', 'opacity': 0.2 });
        //var rect1 = s.rect(100,100,120,100,0,0).attr({ stroke: '#123456', 'strokeWidth': 2, fill: 'red', 'opacity': 0.2 });
        // translate(100, 250) scale(2, 1)
        //rect.transform( 't100,250, S2,1');
        //circle(cx, cy, r)
        //var circle = s.circle(50, 50, 40).attr({ stroke: '#123456', 'strokeWidth': 2, fill: 'red', 'opacity': 0.2});
        //
        //var file = '<?xml version=\"1.0\" standalone=\"no\"?>\r\n<!DOCTYPE svg PUBLIC \"-\/\/W3C\/\/DTD SVG 1.1\/\/EN\"\r\n \"http:\/\/www.w3.org\/Graphics\/SVG\/1.1\/DTD\/svg11.dtd\">\r\n <svg width=\"100%\" height=\"100%\"' + divContainer.children().html()+'<\/svg>';
        //console.log(file);


        ///////////////////////////////////CUBOID///////////////////////

        function drawCuboid(width, height, depth){
            var draw = SVG('svg').size(300, 300)

            var w = width
            var h = height
            var d = depth

            var startX = 150;
            var startY = 150;

            var color = 'pink';

            function generatePoints(x,y,w,h,d) {
                var points = [];

                //front points
                //top-left
                var point0 = [x, y];
                //top-right
                var point1 = [x + w, y];
                //bot-left
                var point2 = [x, y + h];
                //bot - right
                var point3 = [x + w, y + h];

                points.push(point0);
                points.push(point1);
                points.push(point2);
                points.push(point3);

                var xOffset = d * 0.5;
                var yOffset = d * 0.866;

                //back side

                var point4 = [point0[0] + xOffset, point0[1] + yOffset];
                var point5 = [point1[0] + xOffset, point1[1] + yOffset];
                var point6 = [point2[0] + xOffset, point2[1] + yOffset];
                var point7 = [point3[0] + xOffset, point3[1] + yOffset];

                points.push(point4);
                points.push(point5);
                points.push(point6);
                points.push(point7);

                return points;
            }

            function drawFigure(draw, edges) {

                var pointsAsString = [];

                for (var i = 0, l = edges.length; i < l; i++) {
                    pointsAsString.push(edges[i].join());
                }
                //var polygon = draw.polygon('0,0 100,50 50,100').fill('none').stroke({ width: 1 });

                var frontFace = draw.polygon(pointsAsString[0]+' '+pointsAsString[1]+' '+pointsAsString[3]+' '+pointsAsString[2]).fill(color).stroke({ width: 1 });
                var backFace = draw.polygon(pointsAsString[4]+' '+pointsAsString[5]+' '+pointsAsString[7]+' '+pointsAsString[6]).fill(color).stroke({ width: 1 });
                var topFace = draw.polygon(pointsAsString[4]+' '+pointsAsString[0]+' '+pointsAsString[1]+' '+pointsAsString[5]).fill(color).attr({'fill-opacity': 0.5}).stroke({ width: 1 });
                var leftFace = draw.polygon(pointsAsString[6]+' '+pointsAsString[2]+' '+pointsAsString[0]+' '+pointsAsString[4]).fill(color).stroke({ width: 1 });
                var botFace = draw.polygon(pointsAsString[2]+' '+pointsAsString[3]+' '+pointsAsString[7]+' '+pointsAsString[6]).fill(color).attr({'fill-opacity': 0.5}).stroke({ width: 1 });
                var rightFace = draw.polygon(pointsAsString[7]+' '+pointsAsString[5]+' '+pointsAsString[1]+' '+pointsAsString[3]).fill(color).attr({'fill-opacity': 0.5}).stroke({ width: 1 });
            }

            var edges = generatePoints(startX, startY, w, h, d);
            drawFigure(draw, edges);
        }



        function sendFileToServer(){
            var divContainer = $('#svg-container');
            var svgsomething = divContainer.children().html();

            var formData = new FormData();
            var blob = new Blob([String(svgsomething)], {type: 'plain/text'});
            formData.append('file', blob, "pic1.svg");

            var request = new XMLHttpRequest();
            request.open("POST", "/api/v1/projects/");
            //////Console log the request
            //for(var pair of formData.entries()) {
            //    console.log(pair[0]+ ', '+ pair[1].value);
            //}
            //
            //
            //var myReader = new FileReader();
            //myReader.onload = function(event){
            //    console.log(JSON.stringify(myReader.result));
            //};
            //myReader.readAsText(blob);


            request.send(formData);

            request.onreadystatechange = function (oEvent) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        console.log(request.responseText)
                        onSuccess();
                    } else {
                        onError();
                        console.log("Error", request.statusText);
                    }
                }
            };

            function onSuccess(data, status, headers, config) {
                notifier.success('Project successfully sent to server.');
                $location.url('/');
            }

            function onError(data, status, headers, config) {
                notifier.error('Your request has not been sent to the server. Please retry later.');

            }
        }

        drawCuboid(100, 100, 100);

        sendFileToServer();



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
