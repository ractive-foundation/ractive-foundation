Feature: ux-radio test suite

	Scenario: Loading ux-radio
		Given I have loaded component "ux-radio" with use case "dataDriven"
		Then the element "dummy" should have the text "TODO ux-radio contents here."
