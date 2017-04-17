Feature: ux-forms test suite

	Scenario: Loading ux-forms
		Given I have loaded component "ux-forms" with use case "dataDriven"
		Then the element "dummy" should have the text "TODO ux-forms contents here."
