This is a straight-forward Ractive-friendly tooltip with foundation styling.

To enable a full Ractive experience, the tooltip container is pre-rendered during page load rather than being created
on event trigger. This way, we no longer need to pass on any tooltip content data into html to be read by Javascript.

This approach also simplifies the ability to show HTML components inside the tooltip content.

Minor styling modification is added for this change.

To Do:
- Recalculate the position of the tooltip element and the tip arrow on hover.
- Show/remove on different screen size.
- ...

Read [Foundation's tooltip.html](http://foundation.zurb.com/docs/components/tooltips.html) docs for original details.