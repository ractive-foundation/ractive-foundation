Feature: ux-button-group test suite

  Scenario: Loading ux-button-group
    Given I have loaded component "ux-button-group" with use case "default-button-group"
    Then there will be an element for "buttongroup"
    And there are 3 "buttons" elements displayed


    Scenario: Loading ux-button-group
      Given I have loaded component "ux-button-group" with use case "even-3"
      Then there will be an element for "buttongroup"
      And the element "buttongroup" will have the class "even-3"
      And there are 3 "buttons" elements displayed
