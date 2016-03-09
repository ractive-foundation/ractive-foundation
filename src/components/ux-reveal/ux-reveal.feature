Feature: ux-reveal test suite

	Scenario: Loading ux-reveal
		Given I have loaded component "ux-reveal" with use case "dataDriven"
		Then there will be an element for "container"
		And there will be an element for "openModal"
		And "modalBox" will NOT be visible
		When I click the "openModal" element
		And "modalBox" will be visible
		And the element "closeModal" should have the text "×"
		When I click the "closeModal" element
		And "modalBox" will NOT be visible

	Scenario: Custom close button
		Given I have loaded component "ux-reveal" with use case "customCloseText"
		When I click the "openModal" element
		Then "modalBox" will be visible
		And the element "closeModal" should have the text "[close]"
		When I click the "closeModal" element
		And "modalBox" will NOT be visible
