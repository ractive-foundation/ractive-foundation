Feature: ux-thumbnail test suite

	Scenario: Loading ux-thumbnail
		Given I have loaded component "ux-thumbnail" with use case "dataDriven"
		Then the element "img" should have attribute "src" containing "http://placekitten.com/g/1500/500"
		And the element "a" should have attribute "href" containing "#"
