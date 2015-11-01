Feature: ux-tabarea test suite

	Scenario: Loading ux-tabarea
		Given I have loaded component "ux-tabarea" with use case "simple-tabs"
		Then there will be an element for "tabs"
		And the element "firstTab" should have the text "Structure"
		And the element "secondTab" should have the text "Buttons"
		And the element "firstTab" will have the class "active"
		And the element "firstTabContent" will have the class "active"
		And the element "secondTabContent" will have the class "hide"
		When I click the "secondTabLink" element
		Then the element "firstTab" will NOT have the class "active"
		And the element "secondTab" will have the class "active"
		And the element "firstTabContent" will have the class "hide"
		And the element "secondTabContent" will have the class "active"