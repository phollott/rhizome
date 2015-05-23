//BootStrap
var app = angular.module('myApp', ['rhizome']);
var rhizome = angular.module('rhizome', []);

rhizome.directive('rhizSvgPanel', function () {
    return function ($scope, $element, $attr) {
        var svg, svgRoot = Snap($element[0])
        
        $scope.$on('FocusFrame', function (evt, frId) {
            focusFrame(frId, 2000)
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

        loadSvg(res.content.text.div)
        focusFrame('#question1', 0)
    }
});

rhizome.controller('myCtrl', function ($scope, codeService) {
    $scope.test = function() {
        alert(JSON.stringify(res))
    }
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
    
    //Initialize the Controller
    $scope.initQuestionnaire = function() {
        codeService.loadCodedConcepts(res.content.contained)
        $scope.questionnaire = res.content;
        $scope.groupHeader = res.content.group.header;
        $scope.group = res.content.group;
        $scope.$broadcast('FocusFrame', '#question1')
    }
    $scope.initQuestionnaire()

});

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
                "div": '<svg version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="250" height="250"><defs><marker id="markerArrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto"><path d="M2,2 L2,8 L7,6 L2,4" /></marker></defs><rect id="question1" width="100" height="100" x="10" y="10" class="frame" /><g transform="translate(45 48)"><rect rx="3" ry="3" width="25" height="14" style="fill:none;stroke: #3f829f;stroke-width:2;opacity:0.5" /><path d="M25,6 L40,6" style="stroke: black; stroke-width:2; fill: none;marker-end: url(#markerArrow);" /><text x="7" y="10" color="violet" font-size="10">No</text></g><g transform="translate(45 66)"><rect rx="3" ry="3" width="25" height="14" style="fill:none;stroke: #3f829f;stroke-width:2;opacity:0.5" /><path d="M13,15 L13,19" style="stroke: black; stroke-width:2; fill: none;marker-end: url(#markerArrow);" /> <text x="5" y="10" font-size="10">Yes</text></g><text x="20" y="40" font-size="10">Are you a patient?</text><rect id="question2" width="100" height="100" x="20" y="97" class="frame" /><text font-size="9" x="22" y="120">Are you male or female?</text><g transform="translate(43 127)">        <rect rx="3" ry="3" width="36" height="13" style="fill:none;stroke: #3f829f;stroke-width:2;opacity:0.5" /><path d="M36,6 L46,6" style="stroke: black; stroke-width:2; fill: none;marker-end: url(#markerArrow);" /><text x="5" y="10" font-size="9">Female</text>         </g><g transform="translate(43 144)"><rect rx="3" ry="3" width="36" height="13" style="fill:none;stroke: #3f829f;stroke-width:2;opacity:0.5" /><path d="M15,14 L15,19" style="stroke: black; stroke-width:2; fill: none;marker-end: url(#markerArrow);" /><text x="7" y="10" font-size="9">Male</text> </g><rect id="question3" width="100" height="100" x="100" y="10" class="frame" /><rect x="113" y="35" rx="3" ry="3" width="80" height="50" style="fill:none;stroke:#c79b18;stroke-width:2;opacity:0.5" /><text x="121" y="51" font-size="9">Family member.           <tspanx="121" y="61">There are no</tspan><tspan x="121" y="71">further questions.</tspan></text><rect id="question4" width="100" height="100" x="111" y="90" class="frame" /><rect x="122" y="118" rx="3" ry="3" width="80" height="44" style="fill:none;stroke:#d22908;stroke-width:2;opacity:0.5" /><text x="135" y="134" font-size="8">Female patient.<tspan x="132" y="142">Continue on with</tspan> <tspan x="130" y="150">questions about risk.</tspan></text><rect id="question5" width="100" height="100" x="10" y="173" class="frame" /><rect x="20" y="198" rx="3" ry="3" width="80" height="44" style="fill:none;stroke:#d22908;stroke-width:2;opacity:0.5" /> <text x="36" y="212" font-size="8">Male patient.<tspan x="31" y="222">Continue on with</tspan><tspan x="29" y="232">questions about age.</tspan>        </text></svg>'
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
