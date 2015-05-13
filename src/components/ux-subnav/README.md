> This simple sub nav is great for moving between different states of a page. We use these frequently to show iterations of something, typically by date, but they're also handy for filters like these.

Read [Foundation's subnav.html](http://foundation.zurb.com/docs/components/subnav.html) docs for more details.

Example markup:

```html
<ux-subnav class="sub-nav" title="Filter">
  <ux-subnavitem active="true" href="#">All</ux-subnavitem>
  <ux-subnavitem href="#">Active</ux-subnavitem>
  <ux-subnavitem href="#">Pending</ux-subnavitem>
  <ux-subnavitem class="hide-for-small-only" href="#">Suspended</ux-subnavitem>
</ux-subnav>
```
