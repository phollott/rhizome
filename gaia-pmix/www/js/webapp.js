(function () {

	/**
	 * Construct the REST Engine object:
	 * Assemble a query string and then process a get against the prescribed endpoint
	 */
	function RESTEngine(endpoint, exceptionHandler, exceptionClear, format, resource) {
		this.endpoint = endpoint
		this.exceptionClear = exceptionClear
		this.exceptionHandler = exceptionHandler
		this.active = true
		this.offset = 0
		this.count = 1
		this.sort = "_id"
		this.id
		this.format = 'JSON'
		if (format) {
			this.format = format
		}
		if (resource) {
			this.resource = resource
		}
	}

	/**
	 * Assemble the query string
	 */
	RESTEngine.prototype.getQueryString = function() {
		this.exceptionClear()
		var queryString = this.endpoint + this.format + '/' + this.resource
		if (this.id) {
			queryString += '/' + this.id
		}
		return queryString
	}

	/**
	 * If "id" is defined for RESTEngine, a deterministic query is performed.
	 * It is also possible to do a non-deterministic query using query parameters,
	 * but this is currently unsupported (in the endpoint or application)
	 */
	RESTEngine.prototype.processGet = function(callback) {
		var xhr = new XMLHttpRequest({mozSystem: true})
		xhr.open("GET", this.getQueryString(), true)

		xhr.onreadystatechange = function () {
			if (xhr.status === 200 && xhr.readyState === 4) {
				callback(xhr.response)
			}
		}
		xhr.onerror = function () {
			showException("XHR", "An error occurred")
		}
		xhr.send()
	}

	/**
	 * Generic Error Handling - log to console and present onscreen
	 */
	var showException = function(exceptionType, exceptionMessage) {
		var displayException = document.querySelector("#exception-presenter")
		if (displayException) {
			displayException.style.display = "block"
			displayException.innerHTML = exceptionType + ": " + exceptionMessage
		}
		console.log(exceptionType + ": " + exceptionMessage)
	}
	var clearException = function() {
		var displayException = document.querySelector("#exception-presenter")
		if (displayException) {
			displayException.style.display = "none"
		}
	}	

	/**
	 * Simple case: retrieve JSON Person details, and update the name form field
	 */
	var viewPerson = document.querySelector("#view-person")
	if (viewPerson) {
		viewPerson.onclick = function () {
			// Clear the form first, to ignore existing patient data
			var form = document.getElementById('patient')			
			var criteria = form.getElementsByTagName('input')
			patientFormReset(criteria)

			getPersonDetails(function(response) { })
		}
	}

	/**
	 * Simple use case - View Medications by person id. Use JSON endpoint to retrieve family name if not already loaded
	 */
	var viewMeds = document.querySelector("#view-medication")
	if (viewMeds) {
		viewMeds.onclick = function () {
			getPersonDetails(handleMedicationQuery)
		}
	}

	/**
	 * Get Person Details:
	 * Retrieve JSON Person details. This can display more information after the callback.
	 * http://verifyxml.org/OpenXDXPMIX/resources/rest/JSON/person/1
	 */
	var getPersonDetails = function(callback) {
		var personRESTEngine = new RESTEngine(
			'http://verifyxml.org/OpenXDXPMIX/resources/rest/',
			showException,
			clearException,
			'JSON',
			'person'
		)	
		var form = document.getElementById('patient')			
		var criteria = form.getElementsByTagName('input')
		var hasFamilyName = false
		for (var key in criteria) {
			if (criteria.hasOwnProperty(key)) {
				if (criteria[key].name === 'identifier') {
					personRESTEngine.id = criteria[key].value
				}
				if (criteria[key].name === 'family') {
					if (criteria[key].value.length > 0) {
						hasFamilyName = true
					}
				}
			}
		}

		if (hasFamilyName) {
			callback(criteria)
		} else {
			// Extract Patient details and update form fields, then perform callback
			personRESTEngine.processGet(function(response) {
				personRecord = JSON.parse(response)
				personName = personRecord['pmix:PMPRequest']['pmp:RequestPatient']['nc:PersonName']
				personSurName = personName['nc:PersonSurName']
				personGender = personRecord['pmix:PMPRequest']['pmp:RequestPatient']['nc:PersonSexCode']
				personBirthDate = personRecord['pmix:PMPRequest']['pmp:RequestPatient']['nc:PersonBirthDate']['nc:Date']
				criteria['family'].value = personSurName
				criteria['gender'].value = personGender
				criteria['birthdate'].value = personBirthDate
				callback(criteria)				
			})
		}
	}
		
	/**
	 * Simple use case - View Medications by person family name
	 * http://verifyxml.org/OpenXDXPMIX/resources/rest/XML/pmix/SMITH
	 */
	var handleMedicationQuery = function(criteria) {
		var pmixRESTEngine = new RESTEngine(
			'http://verifyxml.org/OpenXDXPMIX/resources/rest/',
			showException,
			clearException,
			'XML',
			'pmix'
		)	
		for (var key in criteria) {
			if (criteria.hasOwnProperty(key)) {
				if (criteria[key].name === 'family') {
					pmixRESTEngine.id = criteria[key].value
					pmixRESTEngine.processGet(function(response) {
						var viewMedicationActivity = new MozActivity({
							name: "view",
							data: {
								type: ['application/xml+niem'],
								domain: 'pmix',
								payload: response
							}
						})					
						viewMedicationActivity.onerror = function() {
							showException('pmix', 'Error with Medication Activity')
						}
						viewMedicationActivity.onsuccess = function() {
							patientFormReset(criteria)
						}
					})
				}
			}
		}
	}
	
	var patientFormReset = function(criteria) {
		criteria['family'].value = null
		criteria['gender'].value = null
		criteria['birthdate'].value = null
	}
	
})()