Feature: ux-flex-video test suite

	Scenario: Loading ux-flex-video
		Given I have loaded component "ux-flex-video" with use case "basic"
		Then there will be an element for "iframe"
		And the element "iframe" should have attribute "height" containing "315"
		And the element "iframe" should have attribute "width" containing "420"
		And the element "iframe" should have attribute "frameborder" containing "0"
