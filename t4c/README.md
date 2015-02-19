Timelines for Care
==================

+ [Back to Rhizome Fundamentals](https://github.com/phollott/rhizome/blob/master/README.md)
+ [Rhizome Timelines4Care Demo](http://jsfiddle.net/phollott/xqphofdg/embedded/result/)

Rhizome: Timelines4Care (T4C) is a health timeline demonstration built using TimelineJS, an open-source library from Northwestern U. (Chicago) Knightlabs, and Careplan resources from the HL7 FHIR standard. This approach could be combined with the Q4C application to highlight gaps in continuity of care.

My primary goal with this demonstration is to show production quality features in a prototype built quickly and without a lot of code (because of the elegance of supporting technology frameworks and standards used). In the attached jsFiddle, you can see that this is accomplished using 60 lines of JavaScript. This application runs on a single message, viewed with a button from within the app. Because this message is based on an industry standard, this same application could easily be used to access a repository of questionnaires. Mapping an HL7 FHIR Careplan resource into the JSON format expected by TimelineJS for this demonstration took about 5 minutes to wire up.

1. Resource-based and standards-based
2. Mobile-enabled by using JSON, RWD, and touchscreen support
3. Emphasis on user experience

A secondary goal of this project is to show how Questionnaire and Careplan resources might work together to create continuity of care, but that falls outside the scope of this demonstration, as does the development of further questionnaires; incidentally, the Careplan may also represent transition of care from on caregiver to another, and the social aspect of care plans is *incredibly* important. Currently this is out of scope.

TimelineJS
---------

TimelineJS is an open-source tool that enables anyone to build visually rich, interactive timelines. Beginners can create a timeline using nothing more than a Google spreadsheet. Experts can use their JSON skills to create custom installations, while keeping TimelineJS's core look and functionality.

It can pull in media from a variety of sources and has built-in support for Twitter, Flickr, Google Maps, YouTube, Vimeo, Vine, Dailymotion, Wikipedia, SoundCloud and more.

HL7 Fast Healthcare Interoperability Resources
----------------------------------------------
HL7 FHIR is a health information standard based on a core set of resources for health, ranging from clinical observations and medication prescriptions to questionnaires and care plans. For this demonstration, I am most concerned with two non-clinical resources, questionnaire and careplan, and in particular, some of the social implications of these resources. Based on a care plan, a patient can be guided through a questionnaire, the outcome of which triggers a new care plan, which might then lead to a visit with a healthcare provider, a follow up questionnaire, or a trip to the emergency room, depending on the plan and the patient's questionnaire responses.

HL7 FHIR is resource-based, meaning that each individual resource can be used in isolation or in composition with other FHIR resources. A questionnaire might contain information about a specific patient, and be bundled with other information about that patient, but it can also be treated separately. Another feature of HL7 FHIR is that every resource has a *human-readable* component, as well as machine-readable encoding of health information. This is because any health message or document may go astray, requiring a technician to handle it. Usually human-readable means HTML markup, but it can also imply an image (for instance, a JPEG showing a physician's scrawled out prescription).

*When a patient falls through the cracks between Acute and Primary Care, this is not just a failure in technology or protocol; this is a failure in narrative. This is a story we must strive to prevent.*

