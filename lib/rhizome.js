var rhizomeBase = angular.module('rhizome', []);

// This directive should be refactored to separate the Ionic part from the FHIR part
// and maybe fix the button half stuff
rhizomeBase.directive('rhzIonQuestionnaire', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            scope.$on('RhzQuestionnaire', function (evt, obj) {
                if (obj.resourceContent) {
                    scope.q4c = obj.resourceContent;
                    scope.groupHeader = obj.resourceContent.group.header;
                    scope.group = obj.resourceContent.group;
                }
            });                
        },
        template: '<div class="col">' +
           '<div class="row responsive-sm" >' +
           '<div class="col q4c-sq1">' +
           '<svg rhz-svg="" id="rhizSvg" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>' +
            '</div>' +
            '<div class="col">' +
            '<div ng-bind="q4c.name.text" class="label q4c-sq2"></div>' +
            '<ol id="questions" class="buttonlist q4c-sq2" rhz-question-group=""></ol>' +
            '<div class="q4c-sq2">' +
            '<button class="buttonhalf" ng-click="restartQuestionnaire()">Restart Q4C</button>' +
            '<button class="buttonhalf" ng-click="showPayload()">Show FHIR</button>' +
            '</div>' +
            '</div>' +
            '</div>'
    }
});

rhizomeBase.directive('rhzSvg', function () {
    return {
        link: function ($scope, $element, $attr) {
            var svg, svgRoot = Snap($element[0])
                    
            $scope.$on('RhzFocusSvg', function (evt, obj) {
                if (obj.svg) {
                    loadSvg(obj.svg)
                    focusFrame(obj.frame, 0)
                } else {
                    focusFrame(obj.frame, 2000)
                }
            });
         
            loadSvg = function(text) {
                var svgFrag = Snap.parse(text)
                svgRoot.append(svgFrag)
                svg = svgRoot.select("#svg")
            }
    
            focusFrame = function(frId, dur) {
                var fr = svg.select(frId)
                svg.animate({
                    x: 0-fr.attr('x'),
                    y: 0-fr.attr('y')
                }, dur)
            }
 
        }
    }
});

rhizomeBase.factory('codeService', function () {
    var svc = {}

    svc.codedConcept = Object;
    svc.initialFrame = null;

    svc.loadCodedConcepts = function (content) {
        svc.initialFrame = content.group.question[0]
            .options.reference;  
        var contained = content.contained;
        for (co in contained) {
            var definedConcept = contained[co].define.concept;
            for (cd in definedConcept) {
                definedConcept[cd].system = contained[co].define.system;
            }
            svc.codedConcept[contained[co].id] = definedConcept;
        }
    };

    svc.getInitialFrame = function () {
        return svc.initialFrame;  
    }
    
    svc.getCodedConcept = function (optionReference, removeHash) {
        if (removeHash) {
            optionReference = optionReference.substr(1);
        }
        return (svc.codedConcept[optionReference]);
    };

    return svc
});
