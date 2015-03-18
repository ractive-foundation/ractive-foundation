##Accordion demo

#### Basic usage
```
<uxaccordion>
	<uxaccordionitem>
		<uxanchor>Testing an anchor1</uxanchor>
		<uxcontent>Accordion 2: Lorem ipsum</uxcontent>
	</uxaccordionitem>

	<uxaccordionitem active="true">
		<uxanchor>Testing an anchor2</uxanchor>
		<uxcontent>Accordion 2: Dolor sit amet</uxcontent>
	</uxaccordionitem>
</uxaccordion>
```

#### Nested Accordions
```
<uxaccordion>

	<uxaccordionitem active="true">
		<uxanchor>Testing an anchor1</uxanchor>
		<uxcontent>Here is the active content for 1</uxcontent>
	</uxaccordionitem>

	<uxaccordionitem>
		<uxanchor>Testing an anchor2</uxanchor>
		<uxcontent>

			<p>Nested accordion example:</p>
			<uxaccordion>
				<uxaccordionitem>
					<uxanchor>Testing an anchor2.1</uxanchor>
					<uxcontent>

						<p>Second nested accordion demo</p>
						<uxaccordion>
							<uxaccordionitem>
								<uxanchor>Testing an anchor2.1.1</uxanchor>
								<uxcontent>Accordion 2.1.1: Lorem ipsum</uxcontent>
							</uxaccordionitem>

							<uxaccordionitem active="true">
								<uxanchor>Testing an anchor2.1.2</uxanchor>
								<uxcontent>Accordion 2.1.2: Dolor sit amet</uxcontent>
							</uxaccordionitem>
						</uxaccordion>

					</uxcontent>
				</uxaccordionitem>

				<uxaccordionitem active="true">
					<uxanchor>Testing an anchor2.2</uxanchor>
					<uxcontent>Accordion 2: Dolor sit amet</uxcontent>
				</uxaccordionitem>
			</uxaccordion>

		</uxcontent>
	</uxaccordionitem>

	<uxaccordionitem>
		<uxanchor>Testing an anchor3</uxanchor>
		<uxcontent>Here is the active content for 3</uxcontent>
	</uxaccordionitem>

</uxaccordion>
```
