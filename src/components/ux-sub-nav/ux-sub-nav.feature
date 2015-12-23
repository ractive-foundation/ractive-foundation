Feature: ux-sub-nav test suite

	Scenario: Loading ux-sub-nav
		Given I have loaded component "ux-sub-nav" with use case "dataDriven"
		Then I should see 4 options
		And the active item should contain the text "All"

	Scenario: Loading ux-sub-nav
		Given I have loaded component "ux-sub-nav" with use case "templateDriven"
		Then I should see 4 options
		And the active item should contain the text "All"
