Feature: ux-button-group test suite
@WIP
  Scenario: Loading ux-button-group
    Given I have loaded component "ux-button-group" with use case "default-button-group"
    Then there will be an element for "buttongroup"
    And the element "a" should have attribute "href" containing "#"
