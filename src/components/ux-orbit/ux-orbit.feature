Feature: ux-orbit test suite

	Scenario: Loading ux-orbit
		Given I have loaded component "ux-orbit" with use case "dataDriven"
		Then there should be 3 of the element "slides"
