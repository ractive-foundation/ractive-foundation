Feature: ux-pricingtable test suite

	Scenario: Loading ux-pricingtable
		Given I have loaded component "ux-pricingtable" with use case "dataDriven"
		Then the element "pricing_table" will have the class "table"

	Scenario: Loading ux-pricingtable
		Given I have loaded component "ux-pricingtable" with use case "templateDriven"
		Then the element "pricing_table" will have the class "table"
