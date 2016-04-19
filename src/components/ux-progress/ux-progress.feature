Feature: ux-progress test suite

	Scenario: Loading ux-progress
		Given I have loaded component "ux-progress" with use case "1-data-driven"
		Then there will be an element for "progress"
