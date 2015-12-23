Feature: ux-button

	Scenario: Button Attributes
		Given I have loaded component "ux-button" with use case "attributes"
		Then there will be an element for "button"
		Then the element "button" will have the class "button"
		Then the element "button" should have attribute "role" containing "button"
		Then the element "button" should have attribute "aria-label" containing "somelabel"
		Then the element "button" should have attribute "tabindex" containing "10"

	Scenario: Anchor Button
		Given I have loaded component "ux-button" with use case "href"
		Then there will be an element for "anchor"

	Scenario Outline: Different States
		Given I have loaded component "ux-button" with use case "<type>"
		Then the element "button" will have the class "<type>"
		Examples:
		| type      |
		| expand    |
		| alert     |
		| disabled  |
		| expand    |
		| info      |
		| large     |
		| radius    |
		| secondary |
		| small     |
		| success   |
		| tiny      |
