Feature: ux-inline-list test suite

	Scenario: Loading ux-inline-list
		Given I have loaded component "ux-inline-list" with use case "dataDriven"
		Then there will be an element for "list"
		And there should be 3 of the element "item"