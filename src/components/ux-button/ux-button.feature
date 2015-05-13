Feature: ux-button

  Scenario: Loading ux-button
    Given I have loaded component "ux-button" with use case "BuyNow"
    Then the element "button" should be displayed
    Then the element "button" should have the "className" of "button"
    Then the element "button" should have the "role" of "button"
    Then the element "button" should have the "ariaLabel" of "somelabel"
    Then the element "button" should have the "tabindex" of "10"
