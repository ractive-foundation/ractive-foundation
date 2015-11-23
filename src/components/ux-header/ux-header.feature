Feature: ux-header

  Scenario: Loading ux-header level 1
    Given I have loaded component "ux-header" with use case "header-level-1"
    Then the element "h1" should be displayed
    Then the element "h1" should have the "className" of "h1Class"
    Then the element "h1" should have attribute "id" containing "h1Id"
    Then the element "h1" should have the text "Header Level 1"

  Scenario: Loading ux-header level 2
    Given I have loaded component "ux-header" with use case "header-level-2"
    Then the element "h2" should be displayed
    Then the element "h2" should have the "className" of "h2Class"
    Then the element "h2" should have attribute "id" containing "h2Id"
    Then the element "h2" should have the text "Header Level 2"

  Scenario: Loading ux-header level 3
    Given I have loaded component "ux-header" with use case "header-level-3"
    Then the element "h3" should be displayed
    Then the element "h3" should have the "className" of "h3Class"
    Then the element "h3" should have attribute "id" containing "h3Id"
    Then the element "h3" should have the text "Header Level 3"

  Scenario: Loading ux-header level 4
    Given I have loaded component "ux-header" with use case "header-level-4"
    Then the element "h4" should be displayed
    Then the element "h4" should have the "className" of "h4Class"
    Then the element "h4" should have attribute "id" containing "h4Id"
    Then the element "h4" should have the text "Header Level 4"

  Scenario: Loading ux-header level 5
    Given I have loaded component "ux-header" with use case "header-level-5"
    Then the element "h5" should be displayed
    Then the element "h5" should have the "className" of "h5Class"
    Then the element "h5" should have attribute "id" containing "h5Id"
    Then the element "h5" should have the text "Header Level 5"

  Scenario: Loading ux-header level 6
    Given I have loaded component "ux-header" with use case "header-level-6"
    Then the element "h6" should be displayed
    Then the element "h6" should have the "className" of "h6Class"
    Then the element "h6" should have attribute "id" containing "h6Id"
    Then the element "h6" should have the text "Header Level 6"

