Feature: ux-dropdowns test suite

	Scenario: Loading ux-dropdowns
		Given I have loaded component "ux-dropdowns" with use case "linkDropdown"
		Then the element "button" should be displayed
		Then the element "button" should have the "className" of "button"
