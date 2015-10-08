Feature: wingComponent test suite

	Scenario: Loading wingComponent
		Given I have loaded component "wingComponent" with use case "dataDriven"
		Then the element "dummy" should have the text "TODO wingComponent contents here."
