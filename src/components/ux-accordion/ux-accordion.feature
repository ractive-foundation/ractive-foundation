Feature: ux-accordion test suite

	Scenario: Loading ux-accordion
		Given I have loaded component "ux-accordion" with use case "default-three-accordions"
		When I click "item1"
		Then the element "content1" should have the text "First accordion item"
		When I click "item2"
		Then the element "content2" should have the text "Second accordion item"
