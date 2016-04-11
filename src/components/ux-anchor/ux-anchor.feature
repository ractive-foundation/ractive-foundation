Feature: ux-anchor test suite

	Scenario: Loading ux-anchor
		Given I have loaded component "ux-anchor" with use case "ux-anchor/use-cases/dataDriven.json"
		Then I should see the "container" element
