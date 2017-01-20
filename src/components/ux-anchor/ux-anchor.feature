Feature: ux-anchor test suite

	Scenario: Loading ux-anchor normal
		Given I have loaded component "ux-anchor" with use case "normal"
		Then there will be an element for "anchor"
		And the element "anchor" should have the text "anchor link"
		And the element "anchor" should have attribute "href" containing "#somelink"

	Scenario: Loading ux-anchor primary
		Given I have loaded component "ux-anchor" with use case "anchor-button-primary"
		Then there will be an element for "anchor"
		And the element "anchor" should have the text "anchor button"
		And the element "anchor" should have attribute "href" containing "#somelink"
		And the element "anchor" should have attribute "aria-label" containing "Link"

	Scenario: Loading ux-anchor template
		Given I have loaded component "ux-anchor" with use case "extraDetails"
		Then there will be an element for "anchor"
		And the element "anchor" should have the text "anchor text"
		And the element "anchor" should have attribute "href" containing "#newTab"
		And the element "anchor" should have attribute "aria-label" containing "Label"
		And the element "anchor" should have attribute "role" containing "Role"
		And the element "anchor" should have attribute "target" containing "_new"
