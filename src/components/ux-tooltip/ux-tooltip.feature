Feature: ux-tooltip test suite

	Scenario: Loading ux-tooltip
		Given I have loaded component "ux-tooltip" with use case "dataDriven"
		When I hover "link"
		Then there will be an element for "tooltip"
		When I click "tooltip"
		Then there will be NO element for "tooltip"