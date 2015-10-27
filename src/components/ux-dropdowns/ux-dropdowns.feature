Feature: ux-dropdowns test suite

	Scenario: Loading ux-dropdowns
		Given I have loaded component "ux-dropdowns" with use case "dataDriven"
		Then the element "dummy" should have the text "TODO ux-dropdowns contents here."
