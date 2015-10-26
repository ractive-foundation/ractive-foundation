Feature: equalizer test suite

	Scenario: Apply equalizer without parent
		Given I have loaded plugin "equalizer" use case "no-parent"
		Then there will be an element for "container"
		And all ".test1,.test2" will have the same height