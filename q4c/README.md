Questions for Care
==================

+ [Back to Rhizome Fundamentals](https://github.com/phollott/rhizome/blob/master/README.md)
+ [Rhizome Questions4Care Demo (jsFiddle)](http://jsfiddle.net/phollott/gku1cd8n/)
+ [Rhizome Questions4Care Demo (run from GitHub)](http://jsfiddle.net/gh/get/AngularJS/1.2.1/phollott/rhizome/tree/master/q4c/)

Rhizome: Questions4Care (Q4C) is a health questionnaire application built using AngularJS and SnapSVG with resources from the HL7 FHIR standard. This app supports acute care applications, like Admission, Discharge, and Transfer (ADT), as well as primary and home care settings. Patients should have access to a single style of application in all of these settings.

My primary goal with this demonstration is to show production quality features in a prototype built quickly and without a lot of code (because of the elegance of supporting technology frameworks and standards used). In the attached jsFiddle, you can see that this is accomplished using 20 lines of HTML and less than 100 lines of JavaScript. This application runs on a single message, viewed with a button from within the app. Because this message is based on an industry standard, this same application could easily be used to access a repository of questionnaires.

1. Resource-based and standards-based
2. Mobile-enabled by using JSON and SVG
3. Emphasis on user experience
4. Reuse of existing assets

In the Q4C demonstration, I have used a Scalable Vector Graphic image instead of HTML (as would be typical in an HL7 FHIR standard, see below). This image represents the original PDF questionnaire upon which the interactive questionnaire is based. It's useful to note how this approach retains the look and feel of the original questionnaire, while providing a robust coded interface. This was a secondary goal of this project.

Another secondary goal of this project is to show how Questionnaire and Careplan resources work together to create continuity of care, but that falls outside the scope of this demonstration, as does the development of further questionnaires; the Careplan may also represent transition of care from on caregiver to another, and while the social aspect of care plans is *incredibly* important, this also falls outside of the current scope.

AngularJS
---------
Angular is a JavaScript framework developed by Google, which augments JavaScript with four main features:

1. ModelView pattern based on partial HTML templating
2. Client-side services, controllers, and other forms of modularization
3. Two-way data-binding between the DOM and the Angular model
4. Dependency injection (Inversion of Control)

SnapSVG
-------
SnapSVG is a JavaScript library that builds on the success of its predecessor, Raphael, to provide superlative control over Scalable Vector Graphic (SVG) images. SVG images are entirely suited for the mobile web because they scale to fit different screen sizes, and they are a standard supported by HTML5, which other vector graphic formats (like Flash) are not. libraries like SnapSVG simplify the process of creating, manipulating, transforming, and animating these images.

In the Q4C app, the SVG image generated from the original PDF has been modified to add a number of invisible rectangles, which are then used to target and scroll to "frames" within the image. 

HL7 Fast Healthcare Interoperability Resources
----------------------------------------------
HL7 FHIR is a health information standard based on a core set of resources for health, ranging from clinical observations and medication prescriptions to questionnaires and care plans. For this demonstration, I am most concerned with two non-clinical resources, questionnaire and careplan, and in particular, some of the social implications of these resources. Based on a care plan, a patient can be guided through a questionnaire, the outcome of which triggers a new care plan, which might then lead to a visit with a healthcare provider, a follow up questionnaire, or a trip to the emergency room, depending on the plan and the patient's questionnaire responses.

HL7 FHIR is resource-based, meaning that each individual resource can be used in isolation or in composition with other FHIR resources. A questionnaire might contain information about a specific patient, and be bundled with other information about that patient, but it can also be treated separately. Another feature of HL7 FHIR is that every resource has a *human-readable* component, as well as machine-readable encoding of health information. This is because any health message or document may go astray, requiring a technician to handle it. Usually human-readable means HTML markup, but it can also imply an image (for instance, a JPEG showing a physician's scrawled out prescription).


*When a patient falls through the cracks between Acute and Primary Care, this is not just a failure in technology or protocol; this is a failure in narrative. This is a story we must strive to prevent.*
