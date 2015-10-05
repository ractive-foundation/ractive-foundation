Feature: ux-pricingtable test suite

  Scenario: Loading ux-pricingtable
    Given I have loaded component "ux-pricingtable" with use case "dataDriven"
    Then the element "title" should have the text "Standard"
