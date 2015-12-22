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

	Scenario: Different States
		Given I have loaded component "ux-button" with use case "expand"
		Then the element "button" will have the class "expand"
		Given I have loaded component "ux-button" with use case "alert"
		Then the element "button" will have the class "alert"
		Given I have loaded component "ux-button" with use case "default"
		Then the element "button" will have the class "button"
		Given I have loaded component "ux-button" with use case "disabled"
		Then the element "button" will have the class "disabled"
		Given I have loaded component "ux-button" with use case "expand"
		Then the element "button" will have the class "expand"
		Given I have loaded component "ux-button" with use case "info"
		Then the element "button" will have the class "info"
		Given I have loaded component "ux-button" with use case "large"
		Then the element "button" will have the class "large"
		Given I have loaded component "ux-button" with use case "radius"
		Then the element "button" will have the class "radius"
		Given I have loaded component "ux-button" with use case "secondary"
		Then the element "button" will have the class "secondary"
		Given I have loaded component "ux-button" with use case "small"
		Then the element "button" will have the class "small"
		Given I have loaded component "ux-button" with use case "success"
		Then the element "button" will have the class "success"
		Given I have loaded component "ux-button" with use case "tiny"
		Then the element "button" will have the class "tiny"
