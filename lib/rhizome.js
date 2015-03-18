var rhizomeBase = angular.module('rhizome', []);

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
