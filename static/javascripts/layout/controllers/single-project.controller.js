(function() {
    'use strict';

    var SingleProjectController = function SingleProjectController($location, $scope, $route, $routeParams, $http, Authentication, singleShapesData, Projects, notifier) {
        var vm = this;
        var id = $routeParams.id;
        var show = false;
        var changedStatus = '';
        vm.changeStatus = changeStatus;
        var categoriesBeautified = [
            'Saved',
            'Sent for Manufacturing, Awaiting approval',
            'Returned for improvements',
            'Sent for Manufacturing, Approved',
            'Manufactured'
        ];
        var svgHtml;
        vm.prettyShape = {};

        singleShapesData.getShape(id)
            .then(function(data) {
                vm.shape = data;

                var categories = Projects.getCategories()
                    .then(function(categories) {
                        var bar = $('#bar');

                        //////////////////Pretify///
                        var status = vm.shape.status;
                        var figurePretty = '';
                        var statusPretty = '';
                            if(vm.shape.shape_type == 'cu'){
                                figurePretty = 'Cube';
                            }else if(vm.shape.shape_type == 'po'){
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

                            vm.prettyShape = {
                                figurePretty: figurePretty,
                                statusPretty: statusPretty,
                                prettyCreateDate: prettyDate(vm.shape.created_at),
                                prettyLastUpdateDate: prettyDate(vm.shape.updated_at),
                            }
                        //////////////////Pretify///

                        if (status == categories[0]) {
                            bar.val(10);
                        } else if (status == categories[1]) {
                            bar.val(20);
                        } else if (status == categories[2]) {
                            bar.val(30);
                        } else if (status == categories[3]) {
                            bar.val(60);
                        } else {
                            bar.val(100);
                        }

                        show = Authentication.isAdm();
                        if(status != categories[2] && !show){
                            // status != returnedForImprovements and is a user
                            $( ".btn-admin-show").addClass("hide-custom").hide();
                            $( ".btn-user-show" ).addClass("hide-custom").hide();
                        }else if(show){
                            // is admin
                            $( ".btn-admin-show").addClass("show-custom").show();
                            $( ".btn-user-show" ).addClass("hide-custom").hide();
                        } else{
                            // status == returnedForImprovements and is a user
                            $( ".btn-admin-show" ).addClass("hide-custom").hide();
                            $( ".btn-user-show" ).addClass("show-custom").show();
                        }
                    });

                svgHtml = vm.shape.svgText;
                while (svgHtml.match(/="([^"]*)\&[gl]t;([^"]*)"/g)) {
                    svgHtml = svgHtml.replace(/="([^"]*)\&gt;([^"]*)"/g, '="$1>$2"')
                        .replace(/="([^"]*)\&lt;([^"]*)"/g, '="$1<$2"');
                }

                svgHtml = $("<div />").html(svgHtml).text()
                $('#svgVisualization').append(svgHtml);
            });

        $("input[name=options]:radio").change(function () {
            changedStatus = $(this).val();
        });

        vm.downloadSvg = function downloadSvg(){
            function downloadInnerHtml(filename, elId, mimeType) {
                var elHtml = document.getElementById(elId).innerHTML;
                var link = document.createElement('a');
                mimeType = mimeType || 'text/plain';

                link.setAttribute('download', filename);
                link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + svgHtml);
                link.click();
            }

            var fileName =  'module.svg'; // You can use the .txt extension if you want

            $('#downloadLink').click(function(){
                downloadInnerHtml(fileName, 'svgVisualization','text/html');
            });
        }

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

        function changeStatus(){
            var svgtext = '';
            if(vm.shape.svg == ''){
                svgtext = 'sure';
            }else{
                svgtext = vm.shape.svgText;
            }
            changedStatus = $("input[name=options]:radio").val();
            return $http.put('/api/v1/projects/'+id+"/", {
                name: vm.shape.name,
                color: vm.shape.color,
                dimension_x: vm.shape.dimension_x,
                dimension_y: vm.shape.dimension_y,
                dimension_z: vm.shape.dimension_z,
                shape_type: vm.shape.shape_type,
                status: changedStatus,
                svgText: svgtext
            }).then(changeStatusSuccessFn, changeStatusErrorFn);

            function changeStatusSuccessFn(data, status, headers, config) {
                $location.url('/view/project/'+id);
                window.location.reload(true);
                notifier.success('Status changed successfully!');
            }

            function changeStatusErrorFn(data, status, headers, config) {
                notifier.error('There was an error. Please retry later. Thank you!');
                console.error(data.data.message);
            }
        }
    };

    angular
        .module('pando-3d.layout.controllers')
        .controller('SingleProjectController', ['$location', '$scope', '$route', '$routeParams', '$http', 'Authentication', 'singleShapesData', 'Projects', 'notifier', SingleProjectController]);
}());
