Feature: ux-orbit test suite

	Scenario: Loading ux-orbit
		Given I have loaded component "ux-orbit" with use case "dataDriven"
		Then there should be 3 of the element "slides"

		And there will be an element for "slide1"
		And the element "image1" should have attribute "src" containing "http://placekitten.com/g/1500/500"

		And there will be an element for "slide2"
		And the element "image2" should have attribute "src" containing "http://placekitten.com/1500/500"
		And the element "slide2" will have the class "active"

		And there will be an element for "slide3"