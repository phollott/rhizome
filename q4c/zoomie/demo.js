//BootStrap
var app = angular.module('myApp', ['rhizome']);

var rhizome = angular.module('rhizome', []);

rhizome.factory('codeService', function () {
    var svc = {}

    svc.codedConcept = Object;

    svc.loadCodedConcepts = function (contained) {
        for (co in contained) {
            var definedConcept = contained[co].define.concept;
            for (cd in definedConcept) {
                definedConcept[cd].system = contained[co].define.system;
            }
            svc.codedConcept[contained[co].id] = definedConcept;
        }
    };

    svc.getCodedConcept = function (optionReference, removeHash) {
        if (removeHash) {
            optionReference = optionReference.substr(1);
        }
        return (svc.codedConcept[optionReference]);
    };

    return svc
});

rhizome.directive('rhizSvgPanel', function () {
    return function ($scope, $element, $attr) {
        var canvas = Snap($element[0]);
        var w = canvas.attr('width')
        var h = canvas.attr('height')

            function focusFrame(frId) {
                if (frId === 'home') {
                    tr = 't0,0'
                } else {
                    var el = canvas.select(frId)
                    var tgt = measureFrame(el)
                    var s = calculateScale(tgt, w, h)
                    var xadj = ((tgt.w / 2) * s) - tgt.cx
                    var yadj = ((tgt.h / 2) * s) - tgt.cy
                    var tr = 't' + xadj + ',' + yadj +
                        's' + s + ',' + tgt.cx + ',' + tgt.cy
                }
                setTimeout(function () {
                    canvas.animate({
                        transform: tr
                    }, 2000)
                }, 500)
            }

            function measureFrame(fr) {
                var w = fr.attr('width'),
                    h = fr.attr('height')
                    var meas = {
                    "cx": (w / 2) + Number(fr.attr('x')),
                        "cy": (h / 2) + Number(fr.attr('y')),
                        "w": w,
                        "h": h
                }
                return meas
            }

            function calculateScale(tgt, w, h) {
                var sx = w / tgt.w,
                    sy = h / tgt.h
                return (sx < sy) ? sx : sy
            }

        $scope.$on('FocusFrame', function (evt, frId) {
            focusFrame(frId)
        });
    }
});

rhizome.controller('myController', function ($scope, codeService) {
    $scope.loadQuestionnaire = function () {
        $scope.questionnaire = res.content;
        codeService.loadCodedConcepts(res.content.contained)
        $scope.groupHeader = res.content.group.header;
        $scope.group = res.content.group;
        var opt = res.content.group.question[0].options.reference
        $scope.$broadcast('FocusFrame', opt)
    };
    $scope.getOptions = function (optRef) {
        return codeService.getCodedConcept(optRef, true);
    };
    $scope.loadGroup = function (question, optCode, optCodeSys) {
        var group = question.group;
        for (g in group) {
            var coding = group[g].name.coding;
            for (c in coding) {
                if ((coding[c].code === optCode) && (coding[c].system === optCodeSys)) {
                    var opt = group[g].question[0].options.reference
                    $scope.$broadcast('FocusFrame', opt);
                    $scope.group = group[g];
                    break;
                }
            }
        }
        return;
    };
    initQuestionnaire = function() {
        $scope.questionnaire = res.content;
        $scope.groupHeader = res.content.group.header;
    }
    initQuestionnaire()
});


var res = {
    "title": "Questionnaire \"3142\" Version \"1\"",
        "id": "https://fhir.healthintersections.com.au/open/Questionnaire/3142",
        "link": [{
        "href": "https://fhir.healthintersections.com.au/open/Questionnaire/3142/_history/1",
            "rel": "self"
    }],
        "updated": "2014-11-04T00:09:57Z",
        "author": [{
        "name": "Anonymous (130.216.120.1)"
    }],
        "published": "2014-12-14T01:46:21Z",
        "content": {
        "resourceType": "Questionnaire",
            "text": {
            "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">&#xA;\t\t\tNIHI FHIR showcase sample questionnaire&#xA;\t\t</div>"
        },
            "contained": [{
            "resourceType": "ValueSet",
                "id": "question1",
                "name": "Patient",
                "description": "Whether the respondent is patient or a family member/friend",
                "status": "active",
                "define": {
                "system": "http://questionnaire.org/system/code",
                    "concept": [{
                    "code": "1",
                        "display": "Yes"
                }, {
                    "code": "0",
                        "display": "No, I am family member/friend"
                }]
            }
        }, {
            "resourceType": "ValueSet",
                "id": "question2",
                "name": "Patient",
                "description": "Is the respondent male or female?",
                "status": "active",
                "define": {
                "system": "http://questionnaire.org/system/code",
                    "concept": [{
                    "code": "F",
                        "display": "Female"
                }, {
                    "code": "M",
                        "display": "Male"
                }]
            }
        }],
            "status": "draft",
            "authored": "2014-10-30T14:15:00",
            "name": {
            "text": "Rhizome Friends and Family Test"
        },
            "group": {
            "header": "Note: This is an anonymous survey, which means you cannot be identified.",
                "question": [{
                "text": "Are you a patient?",
                    "options": {
                    "reference": "#question1"
                },
                    "group": [{
                    "text": "Family Member",
                        "name": {
                        "coding": [{
                            "system": "http://questionnaire.org/system/code",
                                "code": "0"
                        }]
                    },
                        "question": [{
                        "text": "This is a family member, no further questions",
                            "options": {
                            "reference": "#question3"
                        },
                    }]
                }, {
                    "name": {
                        "coding": [{
                            "system": "http://questionnaire.org/system/code",
                                "code": "1"
                        }]
                    },
                        "question": [{
                        "text": "What is your gender?",
                            "options": {
                            "reference": "#question2"
                        },
                            "group": [{
                            "text": "This is a female patient",
                                "name": {
                                "coding": [{
                                    "system": "http://questionnaire.org/system/code",
                                        "code": "F"
                                }]
                            },

                                "question": [{
                                "text": "Female patient. Continue with questions about risk.",
                                    "options": {
                                    "reference": "#question4"
                                },
                            }]

                        }, {
                            "text": "This is a male patient",
                                "name": {
                                "coding": [{
                                    "system": "http://questionnaire.org/system/code",
                                        "code": "M"
                                }]
                            },

                                "question": [{
                                "text": "Male patient. Continue with questions about age.",
                                    "options": {
                                    "reference": "#question5"
                                },
                            }]

                        }]

                    }]
                }]
            }],
        }
    },
        "summary": "<div xmlns=\"http://www.w3.org/1999/xhtml\">&#xA;\t\t\tNIHI FHIR showcase sample questionnaire&#xA;\t\t</div>"
};
