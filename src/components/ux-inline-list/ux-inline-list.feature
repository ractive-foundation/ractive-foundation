Feature: ux-inline-list test suite

	Scenario: Loading ux-inline-list
		Given I have loaded component "ux-inline-list" with use case "dataDriven"
		Then there will be an element for "list"
		And there are 3 "item" elements displayed