Feature: ux-alert test suite

	Scenario: Loading ux-alert
		Given I have loaded component "ux-alert" with use case "standard"
		Then "alertBox" will be visible
		When I click "cross"
		Then "alertBox" will NOT be visible