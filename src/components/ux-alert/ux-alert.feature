Feature: ux-alert test suite

  Scenario: Loading ux-alert
    Given I have loaded component "ux-alert" with use case "standard"
    Then the element "div" should be displayed
    Then the element "div" should have the "className" of "alert-box"
