Feature: ux-pagination test suite

	Scenario Outline: Loading ux-pagination
		Given I have loaded component "ux-pagination" with use case "dataDriven"
		Then the current page is "<current>"
		And there are "<total>" elements displayed
		And pages visible are "<visible>"
		Examples:
			| total | display | current | visible              | hidden |
			| 1     | 10      | 1       | 1                    |        |
			| 2     | 10      | 1       | 1,2                  |        |
			| 2     | 10      | 2       | 1,2                  |        |
			| 9     | 10      | 5       | 1,2,3,4,5,6,7,8,9    |        |
			| 10    | 10      | 5       | 1,2,3,4,5,6,7,8,9,10 |        |
			| 1     | 10      | 1       | 1                    | 1      |
			| 1     | 10      | 1       | 1                    | 1      |
