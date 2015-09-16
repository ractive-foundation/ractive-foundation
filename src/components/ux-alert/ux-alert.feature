Feature: ux-alert test suite

	Scenario: Loading ux-alert
		Given I have loaded component "ux-alert" with use case "standard"
		Then the element "alert" should be displayed
		And the element "alert" should have the "className" of "alert-box"
		When I click "cross"
		Then "alert" will NOT be visible