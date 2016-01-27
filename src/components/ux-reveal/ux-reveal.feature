Feature: ux-reveal test suite

	Scenario: Loading ux-reveal
		Given I have loaded component "ux-reveal" with use case "dataDriven.json"
		Then there will be an element for "container"
		And there will be an element for "openModal"
		And "modalBox" will NOT be visible
		When I click "openModal"
		And "modalBox" will be visible
		When I click "closeModal"
		And "modalBox" will NOT be visible