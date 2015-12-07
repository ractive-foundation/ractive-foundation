Feature: ux-header test suite

	Scenario Outline: Loading ux-header
		Given I have loaded component "ux-header" with use case "<usecase>"
		Then "<element>" will be visible
		And the element "<element>" will have the class "<class>"
		And the element "<element>" should have attribute "id" containing "<idvalue>"
		And the element "<element>" should have the text "<text>"
		Examples:
		| usecase        | element | class   | idvalue | text           |
		| header-level-1 | h1      | h1Class | h1Id    | Header Level 1 |
		| header-level-2 | h2      | h2Class | h2Id    | Header Level 2 |
		| header-level-3 | h3      | h3Class | h3Id    | Header Level 3 |
		| header-level-4 | h4      | h4Class | h4Id    | Header Level 4 |
		| header-level-5 | h5      | h5Class | h5Id    | Header Level 5 |
		| header-level-6 | h6      | h6Class | h6Id    | Header Level 6 |
