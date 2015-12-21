Feature: ux-breadcrumbs test suite

  Scenario: Loading ux-breadcrumbs
    Given I have loaded component "ux-breadcrumbs" with use case "nav"
    Then I should see 4 breadcrumbs
    And the "third" breadcrumb should be "unavailable"
    And the "fourth" breadcrumb should be "current"
