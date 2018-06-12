Feature: ux-joyride test suite

	Scenario: Loading ux-joyride with dataDriven
		Given I have loaded component "ux-joyride" with use case "dataDriven"
		Then there will be an element for "startLink"
		When I hover the "startLink" element
		Then there will be NO element for "joyrideContainer"
		When I click the "startLink" element
		Then there will be an element for "joyrideContainer"
		And there will be an element for "nextButton"
		And there will be NO element for "prevButton"
		#click on point 1
		When I click the "nextButton" element
		Then there will be an element for "nextButton"
		And there will be an element for "prevButton"
		#click on point 2
		When I click the "nextButton" element
		Then there will be NO element for "nextButton"
		And there will be an element for "prevButton"

	Scenario: Loading ux-joyride with open on init
		Given I have loaded component "ux-joyride" with use case "openOnInit"
		Then there will be an element for "joyrideContainer"

	Scenario: Loading ux-joyride with show on hover
		Given I have loaded component "ux-joyride" with use case "showOnHover"
		Then there will be an element for "startLink"
		When I hover the "startLink" element
		Then there will be an element for "joyrideContainer"
