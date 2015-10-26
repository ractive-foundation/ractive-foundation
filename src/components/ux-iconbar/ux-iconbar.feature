Feature: ux-iconbar test suite

  Scenario: Loading ux-iconbar 1
    Given I have loaded component "ux-iconbar" with use case "1-default-iconbar"
    Then there will be an element for "iconbar"

  Scenario: Loading ux-iconbar 2
	Given I have loaded component "ux-iconbar" with use case "2-label-right"
	Then there will be an element for "iconbar"
