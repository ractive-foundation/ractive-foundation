Feature: ux-off-canvas test suite

    Scenario: Loading ux-off-canvas
        Given I have loaded component "ux-off-canvas" with use case "dataDriven"
        Then there will be an element for "offCanvas"
        And there will be an element for "leftMenu"
        And there will be an element for "rightMenu"

        And the element "offCanvas" will NOT have the class "move-right"
        When I click the "leftMenuButton" element
        Then the element "offCanvas" will have the class "move-right"
        When I click the "exitButton" element
        And the element "offCanvas" will NOT have the class "move-right"

        And the element "offCanvas" will NOT have the class "move-left"
        When I click the "rightMenuButton" element
        Then the element "offCanvas" will have the class "move-left"
        When I click the "exitButton" element
        And the element "offCanvas" will NOT have the class "move-left"
