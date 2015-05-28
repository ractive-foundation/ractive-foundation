> Breadcrumbs come in handy to show a navigation trail for users clicking through a site or app. They'll fill out 100% of the width of their parent container.

Read [Foundation's breadcrumb.html](http://foundation.zurb.com/docs/components/breadcrumbs.html) docs for more details.

Example markup:

```html
<ux-breadcrumb isnav="true">
    <ux-breadcrumb-item href="#">Home</ux-breadcrumb-item>
    <ux-breadcrumb-item href="#">Features</ux-breadcrumb-item>
    <ux-breadcrumb-item isunavailable="true" href="#">Gene Splicing</ux-breadcrumb-item>
    <ux-breadcrumb-item iscurrent="true" href="#">Cloning</ux-breadcrumb-item>
</ux-breadcrumb>
```
