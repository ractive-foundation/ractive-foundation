Feature: ux-switch test suite

	Scenario: Loading ux-switch
		Given I have loaded component "ux-switch" with use case "default-switch"
		Then the element "checkbox" should have the value "true"
