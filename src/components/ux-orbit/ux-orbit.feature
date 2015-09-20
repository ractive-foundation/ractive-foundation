Feature: ux-orbit test suite

  Scenario: Loading ux-orbit
    Given I have loaded component "ux-orbit" with use case "dataDriven"
    Then I should see 3 slides
