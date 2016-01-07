Feature: ux-flex-video test suite

	Scenario: Loading ux-flex-video basic
		Given I have loaded component "ux-flex-video" with use case "basic"
		Then there will be an element for "iframe"
		And the element "iframe" should have attribute "height" containing "315"
		And the element "iframe" should have attribute "width" containing "420"
		And the element "iframe" should have attribute "frameborder" containing "0"

	Scenario: Loading ux-flex-video advanced
		Given I have loaded component "ux-flex-video" with use case "advanced"
		Then there will be an element for "iframe"
		And the element "iframe" should have attribute "height" containing "225"
		And the element "iframe" should have attribute "width" containing "400"
		And the element "iframe" should have attribute "frameborder" containing "0"
		And the element "flexvideo" will have the class "widescreen"
		And the element "flexvideo" will have the class "vimeo"
