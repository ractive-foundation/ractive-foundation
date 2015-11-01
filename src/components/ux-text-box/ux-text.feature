Feature: ux-text-box test suite

	Scenario: Loading ux-text-box
		Given I have loaded component "ux-text-box" with use case "dataDriven"
		Then the element "dummy" should have the text "TODO ux-text-box contents here."
