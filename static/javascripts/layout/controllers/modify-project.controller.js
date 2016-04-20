(function () {
    'use strict';

    ModifyProjectController.$inject = ['$location', '$scope', '$http', '$cookies', '$routeParams', 'singleShapesData', 'Authentication', 'notifier'];

    function ModifyProjectController($location, $scope, $http, $cookies, $routeParams, singleShapesData, Authentication, notifier) {
        var vm = this;
        var id = $routeParams.id;
        var color = '#e2a7f7'; //initial value
        var width = 150; //initial value
        var height = 50; //initial value
        var depth = 100; //initial value
        var selectedFigure = "cu" //initial value
        var widthMinValue = 50;
        var widthMaxValue = 350;
        var heightMinValue = 50;
        var heightMaxValue = 350;
        var depthMinValue = 50;
        var depthMaxValue = 350;
        var dimXField = $("#dim-x");
        var dimYField = $("#dim-y");
        var dimZField = $("#dim-z");
        var colorpickerInput = $('#cp1');
        var divContainer = $('#svg-container');
        var drawnSvg = $("#svg");

        singleShapesData.getShape(id)
            .then(function(data) {
                vm.shape = data;
                color = '#' + vm.shape.color;
                drawFigure(vm.shape.dimension_x, vm.shape.dimension_y, vm.shape.dimension_z, color, vm.shape.shape_type);
                colorpickerInput.val() = color;
                dimXField.val() = Number(vm.shape.dimension_x);
                dimYField.val() = Number(vm.shape.dimension_y);
                dimZField.val() = Number(vm.shape.dimension_z);
            });

        vm.submitProject = submitProject;

        $(function() {
            colorpickerInput.colorpicker({
                format: 'hex',
                color: color
            });
            colorpickerInput.val() = color;
            colorpickerInput.colorpicker('update');
        });

        $("input[name=shapeType]:radio").change(function () {
            var val = $(this).val();
            if(val == 'Cuboid'){
                selectedFigure = 'po';
                drawnSvg.html("");
                $("#dim-y-label").addClass().addClass("show-custom").show();
                $("#dim-z-label").addClass().addClass("show-custom").show();
                drawFigure(width, height, depth, color, selectedFigure);
            } else if (val == 'Sphere') {
                selectedFigure = 'sp';
                drawnSvg.html("");
                $("#dim-y-label").addClass().addClass("hide-custom").hide();
                $("#dim-z-label").addClass().addClass("hide-custom").hide();
                drawFigure(width, height, depth, color, selectedFigure);
            } else if (val == 'Cube') {
                selectedFigure = 'cu';
                drawnSvg.html("");
                $("#dim-y-label").addClass().addClass("hide-custom").hide();
                $("#dim-z-label").addClass().addClass("hide-custom").hide();
                drawFigure(width, height, depth, color, selectedFigure);
            }
        });

        colorpickerInput.colorpicker().on('changeColor', function(ev){
            color = ev.color.toHex();
            drawFigure(width, height, depth, color, selectedFigure);
        });

        function changeWidth(){
            width = Number(dimXField.val());
            if(width >= widthMinValue && width <= widthMaxValue){
                drawnSvg.html("");
                drawFigure(width, height, depth, color, selectedFigure);
            }
        }

        function changeHeight(){
            height = Number(dimYField.val());
            if(height >= heightMinValue && height <= heightMaxValue) {
                drawnSvg.html("");
                drawFigure(width, height, depth, color, selectedFigure);
            }
        }

        function changeDepth(){
            depth = Number(dimZField.val());
            if(depth >= depthMinValue && depth <= depthMaxValue) {
                drawnSvg.html("");
                drawFigure(width, height, depth, color, selectedFigure);
            }
        }

        dimXField.bind('keyup mouseup', function () {
            changeWidth();
        });

        dimYField.bind('keyup mouseup', function () {
            changeHeight();
        });

        dimZField.bind('keyup mouseup', function () {
            changeDepth();
        });

        dimXField.on('mouseup change',function(e){
            changeWidth();
        });

        dimYField.on('mouseup change',function(e){
            changeHeight();
        });

        dimZField.on('mouseup change',function(e){
            changeDepth();
        });

        dimXField.on('keyup input',function(e){
            changeWidth();
        });

        dimYField.on('keyup input',function(e){
            changeHeight();
        });

        dimZField.on('keyup input',function(e){
            changeDepth();
        });

        function drawFigure(width, height, depth, color, selectedFigure){
            switch(selectedFigure) {
                case 'cu':
                    drawCuboid(width, width, width, color);
                    break;
                case 'po':
                    drawCuboid(width, height, depth, color);
                    break;
                case 'sp':
                    var draw = SVG('svg').size(400, 400);
                    draw.circle(width);
                    break;
                default:
                    drawCuboid(width,  height, depth, color);
            }
        }

        ///////////////////////////////////CUBOID///////////////////////

        function drawCuboid(width, height, depth, color){
            var draw = SVG('svg').size(400, 400);

            var w = width;
            var h = height;
            var d = depth;

            var startX = 30;
            var startY = 30;

            var color = color;

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

        function sendFileToServer(shape_type, dimension_x, dimension_y, dimension_z, color, status, svgText, name, id){
            var svgsomething = divContainer.children().html();

            var formData = new FormData();
            var blob = new Blob([String(svgsomething)], {type: 'plain/text'});
            formData.append('file', blob, name + ".svg");
            formData.append('author', Authentication.getAuthenticatedAccount().id);
            formData.append('shape_type', shape_type);
            formData.append('dimension_x', dimension_x);
            formData.append('dimension_y', dimension_y);
            formData.append('dimension_z', dimension_z);
            formData.append('color', color);
            formData.append('status', status);
            formData.append('svgText', svgText);
            formData.append('name', name);

            var request = new XMLHttpRequest();
            request.open("POST", "/api/v1/projects/" + id + "/");
            request.setRequestHeader('X-CSRFToken',$cookies.csrftoken);
            //////Console log the request
            //for(var pair of formData.entries()) {
            //    console.log(pair[0]+ ', '+ pair[1].value);
            //}
            //var myReader = new FileReader();
            //myReader.onload = function(event){
            //    console.log(result);
            //    console.log(myReader.result);
            //    console.log(JSON.parse(myReader.result));
            //    console.log(JSON.stringify(myReader.result));
            //};
            //myReader.readAsText(blob);

            request.send(formData);

            request.onreadystatechange = function (oEvent) {
                if (request.readyState === 4) {
                    if (request.status === 200 || request.status === 201) {
                        console.log(request.responseText)
                        onSuccess();
                    } else {
                        console.log("Error", request.statusText);
                        onError();
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

        function htmlEntitiesEscape(str) {
            return String(str).replace(/</g, '&lt;');
        }

        function submitProject(project) {
            var svgText = '<?xml version=\"1.0\" standalone=\"no\"?>\r\n<!DOCTYPE svg PUBLIC \"-\/\/W3C\/\/DTD SVG 1.1\/\/EN\"\r\n \"http:\/\/www.w3.org\/Graphics\/SVG\/1.1\/DTD\/svg11.dtd\">\r\n <svg width=\"100%\" height=\"100%\"' + divContainer.children().html()+'<\/svg>';
            svgText = htmlEntitiesEscape(svgText);
            color = colorpickerInput.val().substring(1);
            selectedFigure = $("input[name=shapeType]:radio").val();
            var valueFigureForServer = '';
            if(selectedFigure == 'Cube'){
                valueFigureForServer = 'cu';
            }else if(selectedFigure == 'Cuboid'){
                valueFigureForServer = 'po';
            }else{
                valueFigureForServer = 'sp';
            }
            sendFileToServer(valueFigureForServer, project.dimension_x, project.dimension_y, project.dimension_z, color, 'saved', svgText, vm.shape.name, id);
        }
    }

    angular
        .module('pando-3d.layout.controllers')
        .controller('ModifyProjectController', ModifyProjectController);
}());
