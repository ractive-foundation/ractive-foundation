Feature: ux-select test suite

	Scenario: Loading ux-select
		Given I have loaded component "ux-select" with use case "dataDriven"
		Then the element "dummy" should have the text "TODO ux-select contents here."
