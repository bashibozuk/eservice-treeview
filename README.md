Simple AngularJS tree view

Usage:
``` html
<div eservice-tree-view="true" scope-tree-data="data" checkboxes="true" expand-all="false" on-checkbox-click="onCheckboxClick"></div>
```

- scope-tree-data - the key in the scope which contains the tree;
- checkboxes - checkboxes mode . It is on if attribute value is === 'true'. By default applies checkboxes to all the leaves in the tree;
- on-checkbox-click - the scope member that will be called when checkbox is clicked if it is a function;
- expand-all renders all the nodes expanded, no option to collapse them;
