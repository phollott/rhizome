var rhizomeBase = angular.module('rhizome', []);

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

rhizomeBase.directive('rhzQuestionGroup', function (codeService) {
    return {
        link: function (scope, element, attrs) {
            scope.loadGroup = function (question, optCode, optCodeSys) {
                var group = question.group;
                for (g in group) {
                    var coding = group[g].name.coding;
                    for (c in coding) {
                        if ((coding[c].code === optCode) && (coding[c].system === optCodeSys)) {
                            var opt = group[g].question[0].options.reference
                            scope.$broadcast('RhzFocusSvg', { 
                                'frame': opt })
                            scope.group = group[g];
                            break;
                        }
                    }
                }
                return;
            };
        },
        template: '<li ng-repeat="question in group.question">' +
        '<div class="question">{{question.text}}</div>' +
        '<ol id="options" class="buttonlist">' +
        '<li ng-repeat="option in getOptions(question.options.reference)">' +
        '<button class="buttonface" ng-click="loadGroup(question, option.code, option.system)" ng-bind="option.display"></button>' +
        '</li></ol>' +
        '<li/>'
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
