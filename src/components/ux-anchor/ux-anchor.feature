Feature: ux-anchor test suite

	Scenario: Loading ux-anchor
		Given I have loaded component "ux-anchor" with use case "normal"
		Then there will be an element for "anchor"
