Feature: ux-alert test suite

	Scenario: Loading ux-alert
		Given I have loaded component "ux-alert" with use case "standard"
		Then there will be an element for "alertBox"
		When I click the "cross" element
		Then "alertBox" will NOT be visible
