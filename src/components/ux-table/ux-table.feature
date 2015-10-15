Feature: ux-table test suite

	Scenario Outline: ux-table with various data
		Given I have loaded component "ux-table" with use case "ux-table/use-cases/<mock>.json"
		Then there will be an element for "container"
		And there will be an element for "table"
        And I will see "<columns>" "column" elements displayed
        And I will see "<rows>" "row" elements displayed
		Examples:
		  | mock      | columns   | rows  |
		  | 3Rows     | 4         | 3     |
		  | 4Rows     | 4         | 4     |
		  | 5Columns  | 5         | 2     |
		  | 6Columns  | 6         | 2     |