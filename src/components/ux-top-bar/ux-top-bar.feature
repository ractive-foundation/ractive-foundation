Feature: ux-top-bar test suite

	Scenario: Loading ux-top-bar
		Given I have loaded component "ux-top-bar" with use case "1-data-driven"
		Then there will be an element for "topBar"
		And there will be an element for "title"
		And the element "title" should have the text "Test Title"

		And there are 1 "leftLevel1" elements displayed

		And there are 2 "rightLevel1" elements displayed
		And there are 3 "rightLevel2" elements displayed
		And there are 3 "rightLevel3" elements displayed
