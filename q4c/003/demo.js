var app = angular.module('rhizApp', ['rhizome']);

app.controller('mainCtrl', function ($scope, $rootScope) {
    $rootScope.$on('RhzTest', function (event, data) {
        alert('rootscope:rhztest');
      alert(data.test); // 'Data to send'
    });
});

app.controller('t4cCtrl', function ($scope) {               
    var slides = [{
        "startDate": "2010", "tag": "Release",
 //       "headline": "Added Results Report to Get",
        "asset": {
            "media": "https://jsfiddle.net/phollott/f0rjwtuq/17/embedded/result/"
        }
    }]

    var dataObject = {
        "timeline": {
            "headline": "Disk Usage Projections",
                "type": "default",
                "text": "For PLIS MPL Schema",
                "startDate": "2015,2,17",
                "date": slides           
       }
    }
    $scope.events = dataObject;
});

app.directive('timelineJs',  function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            postpone = $timeout(function() {
                createStoryJS({
                    type:       'timeline',
                    width:      '800',
                    height:     '600',
                    source:     scope.events,
                    embed_id:   'my-timeline'
                });
            }, 50);
            console.log("Running timelineJS");
        }
    }
});

/*
// DOM element where the Timeline will be attached
var container = document.getElementById('example-timeline');

// Create a DataSet with data 
var data = new vis.DataSet([{
    id: 1,
    content: 'First event',
    start: '2014-08-01'
}, {
    id: 2,
    content: 'Pi and Mash',
    start: '2014-08-08'
}, {
    id: 3,
    content: 'Wikimania',
    start: '2014-08-08',
    end: '2014-08-10'
}, {
    id: 4,
    content: 'Something else',
    start: '2014-08-20'
}, {
    id: 5,
    content: 'Summer bank holiday',
    start: '2014-08-25'
}]);

// Configuration for the Timeline as JSON object
var options = {
    width: '100%',
    editable: true, /* this option means you can add or remove items by clicking on the timeline
    margin: {
        item: 20
    }
};
*/

// Create a Timeline
//var timeline = new vis.Timeline(container, data, options);

app.controller('q4cCtrl', function ($scope, codeService) {
    var resource = res;

    // Small timing hack once the resource is loaded
    $scope.q4c = resource.content;
    codeService.loadCodedConcepts(resource.content)
    $scope.groupHeader = resource.content.group.header;
    $scope.group = resource.content.group;
    setTimeout(function () {
        $scope.$broadcast('RhzFocusSvg', {
            svg: resource.content.text.div,
            frame: codeService.getInitialFrame()
        })
    }, 0);

    $scope.restartQuestionnaire = function () {
        $scope.group = resource.content.group;
        $scope.$broadcast('RhzFocusSvg', {
            frame: codeService.getInitialFrame()
        });
    }

    $scope.showPayload = function () {
        alert(JSON.stringify(resource))
    }

});

// HL7 FHIR JSON Document

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
