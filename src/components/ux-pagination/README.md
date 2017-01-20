> ux-pagination Documentation

Documentation about styling pagination can be found at [Foundataion's pagination page](http://foundation.zurb.com/docs/components/pagination.html)

When using the ux-pagination component in data driven mode it greatly
simplifies the pagination process. The component only needs to know the
current page (via ```currentPage```), the total number of pages to display (via
```totalPages```) and how many pages to display (via ```displayPages``` which
defaults to 10). When the user clicks on a page the event ```newPage``` will
be fired with the new page number, all the widget/component using this
pagination needs to do is listen for the event and change its data as
appropriate.

