Feature: ux-accordion test suite

	Scenario: Loading ux-accordion
		Given I have loaded component "ux-accordion" with use case "default-three-accordions"
		When I click the "item1" element
		#Then the element "content1" should have the text "First accordion item"
		#When I click the "item2" element
		#Then the element "content2" should have the text "Second accordion item"
