Feature: ux-label test suite

  Scenario: Loading ux-label
	Given I have loaded component "ux-label" with use case "info"
	Then the element "span" will have the class "info"
	And the element "span" should have the text "Info"

  Scenario: Loading ux-label
	Given I have loaded component "ux-label" with use case "round-alert"
	Then the element "span" will have the class "alert"
	And the element "span" will have the class "round"
	And the element "span" should have the text "Round Alert"