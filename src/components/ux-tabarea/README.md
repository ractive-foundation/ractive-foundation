> Tabs are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.

Read [Foundation tabs.html](http://foundation.zurb.com/docs/components/tabs.html) page for details.

Markup example:

```html
<ux-tabarea>

    <ux-tablinks>
        <ux-tablink active="true">Tab One</ux-tablink>
        <ux-tablink>Tab Two</ux-tablink>
        <ux-tablink id="tab-deeplink-3">Tab Three</ux-tablink>
    </ux-tablinks>

    <ux-tabpanes>
        <ux-tabpane>
            First tab content
        </ux-tabpane>
        <ux-tabpane>
            Second tab content
        </ux-tabpane>
        <ux-tabpane>
            Third tab content
        </ux-tabpane>
    </ux-tabpanes>

</ux-tabarea>
```