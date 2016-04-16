(function () {
    'use strict';

    var svgsDirective = function svgsDirective() {
        //return {
        //    restrict: 'E',
        //    transclude: true,
        //    compile: function(tElement, tAttr, transclude){
        //        var template = '/../shape-templates/rectangle.xml';
        //
        //        return function(scope, element, attr){
        //            var paper = Snap(svgElement);
        //            Snap.load("drawing.svg",onDrawingLoaded);
        //            function onDrawingLoaded(d){
        //                var yellow=d.select("#yellowRect");
        //                paper.append(d);
        //                yellow.animate({width:600,height:600},4000);
        //            }
        //        }
        //    }
        //};

        return {
            restrict: 'E',
            templateUrl: '/../shape-templates/rectangle.xml'
        }
    };

    angular
        .module('pando-3d.layout.directives')
        .directive('svgsDirective', [svgsDirective]);

}());
