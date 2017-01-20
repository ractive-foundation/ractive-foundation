Feature: ux-iconbar test suite

	Scenario: Loading ux-iconbar 1
		Given I have loaded component "ux-iconbar" with use case "1-default-iconbar"
		Then there will be an element for "iconbar"
		And there are 5 "item" elements displayed
		And the element "thirdItem" will have the class "disabled"
		And there will be NO element for "thirdItemLabel"

	Scenario: Loading ux-iconbar 2
		Given I have loaded component "ux-iconbar" with use case "2-label-right"
		Then there will be an element for "iconbar"
		And there are 5 "item" elements displayed
		And the element "fourthItem" will have the class "disabled"
		And there will be NO element for "secondItemLabel"
