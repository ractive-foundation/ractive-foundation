Feature: ux-label test suite

	Scenario Outline: Loading ux-label
		Given I have loaded component "ux-label" with use case "<usecase>"
		Then the element "span" will have the class "<class>"
		And the element "span" should have the text "<text>"
		Examples:
		| usecase			| class		| text 				|
		| info				| info		| Info				|
		| radius-secondary	| radius	| Secondary Radius	|
		| radius-secondary	| secondary	| Secondary Radius	|
		| regular			| 			| Default			|
		| round-alert		| alert		| Round Alert		|
		| round-alert		| round		| Round Alert		|
		| success			| success	| Success			|
		| warning			| warning	| Warning			|