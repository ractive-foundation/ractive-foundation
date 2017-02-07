Feature: ux-pagination test suite

	Scenario: Loading ux-pagination
		Given I have loaded component "ux-pagination" with use case "dataDriven"
		Then the element "activePage" should have the text "10"
		And there are 12 "paginationItems" elements displayed
