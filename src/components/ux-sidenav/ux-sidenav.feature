Feature: ux-sidenav test suite

  Scenario: Loading ux-sidenav
    Given I have loaded component "ux-sidenav" with use case "1-data-driven"
    Then there will be an element for "sideNav"
    And the element "sideNav" should have attribute "role" containing "menu"