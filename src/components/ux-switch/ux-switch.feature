Feature: ux-switch test suite

	Scenario: Loading ux-switch
		Given I have loaded component "ux-switch" with use case "default-switch"
		Then there will be an element for "checkbox"
		Then the element "checkbox" should have attribute "type" containing "checkbox"
		Then the element "checkbox" should have the value "true"

	Scenario: Loading ux-switch as radio button
		Given I have loaded component "ux-switch" with use case "radio"
		Then there will be an element for "checkbox"
		Then the element "checkbox" should have attribute "type" containing "radio"
		Then the element "container" should have attribute "group" containing "exampleGroup"
		Then the element "checkbox" should have the value "true"
