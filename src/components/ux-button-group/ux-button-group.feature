Feature: ux-button-group test suite

	Scenario: Stacking use-case
		Given I have loaded component "ux-button-group" with use case "stacking"
		Then there will be an element for "containerA"
		And there will be an element for "containerB"

	Scenario: Advanced use-case
		Given I have loaded component "ux-button-group" with use case "advanced"
		Then there will be an element for "containerA"
		And there will be an element for "containerB"

	Scenario: Styling use-case
		Given I have loaded component "ux-button-group" with use case "styling"
		Then there will be an element for "containerA"
		And there will be an element for "containerB"

	Scenario: Simple use-case
		Given I have loaded component "ux-button-group" with use case "simple"
		And there will be an element for "container"

