Feature: ux-table test suite

    Scenario Outline: Loading ux-table
		Given I have loaded component "ux-table" with use case "<mock>"
		And there will be an element for "table"
        And there are "<columns>" "column" elements displayed
        And there are "<rows>" "row" elements displayed
		Examples:
		  | mock      | columns   | rows  |
		  | 3Rows     | 4         | 3     |
		  | 4Rows     | 4         | 4     |
		  | 5Columns  | 5         | 2     |
		  | 6Columns  | 6         | 2     |