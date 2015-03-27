> Tabs are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.

Read [Foundation tabs.html](http://foundation.zurb.com/docs/components/tabs.html) page for details.

Example markup:

```html
<ux-tabarea>

    <ux-tablinks>
        <ux-tablink active="true">Nested Tab One</ux-tablink>
        <ux-tablink>Nested Tab Two</ux-tablink>
        <ux-tablink>Nested Tab Three</ux-tablink>
        <ux-tablink>Nested Tab Fourth</ux-tablink>
    </ux-tablinks>

    <ux-tabpanes>
        <ux-tabpane>
            Nested first tab content
        </ux-tabpane>
        <ux-tabpane>
            Nested second tab content
        </ux-tabpane>
        <ux-tabpane>
            Nested third tab content
        </ux-tabpane>
        <ux-tabpane>
            Nested fouth tab content
        </ux-tabpane>
    </ux-tabpanes>

</ux-tabarea>
```