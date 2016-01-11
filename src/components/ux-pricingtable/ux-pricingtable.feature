Feature: ux-pricingtable test suite

	Scenario: Loading ux-pricingtable
		Given I have loaded component "ux-pricingtable" with use case "dataDriven"
		Then the element "pricing_table" will have the class "table"
		And there will be an element for "title"
		And there will be an element for "price"
		And there will be an element for "description"
		And there will be an element for "button"
		And there are 3 "bullet" elements displayed
		And the element "title" will have the text "Standard"
		And the element "price" will have the text "$99.9"
		And the element "description" will have the text "An awesome description"

	Scenario: Loading ux-pricingtable
		Given I have loaded component "ux-pricingtable" with use case "templateDriven"
		Then the element "pricing_table" will have the class "table"
