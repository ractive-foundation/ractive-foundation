Feature: equalizer test suite

	Scenario: Apply equalizer without parent
		Given I have loaded plugin "equalizer" use case "with-parent"
		Then there will be an element for "container"
		And all ".test1,.test2" will have the same height
		And all ".test3,.test4" will have the same height
