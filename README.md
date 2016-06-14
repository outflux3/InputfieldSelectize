# InputfieldSelectize

A Inputfield to provide a select interface for FieldtypePage.

Selectize Library: [http://selectize.github.io/selectize.js/](http://selectize.github.io/selectize.js/)

## Features

- Custom designed options and items
- Can use images, javascript conditionals and any data from PW to build your selects.
- Sortable pages

## Usage

- Install the Module
- Edit your pagefield and choose `InputfieldSelectize` as inputfield.

-----

### Example of array to be used by the select:
PHP:
```
$data = array(
    'title' => $page->title,
    'company' => $page->company_select ? $page->company_select->title : 'Not set',
    'total' => count($page->recipients),
    'editUrl' => $page->editUrl
);

return $data;
```

### Javascript Example for item and option:
```
'<div class="item">' +
'<span style="display:block;font-size:14px;font-weight:bold;">' + escape(item.title)  + ' (' + escape(item.total) + ')</span>' +
'<span>' + escape(item.company) + '</span>' +
'</div>'
```

-----

### Another more advanced example
**PHP**
```
$data = array(
  'title' => $page->title,
  'year' => $page->year ?: $page->year_sort,
  'for_inst' => $page->for_inst,
  'edit_href' => $page->editUrl
);

return $data;
```

**Item:**
```
'<div class="item">' +
'<div style="color: black; font-size: 14px;"><span style="font-weight:bold;">' + escape(item.title) + ' (' + escape(item.year) + ')</span>' +
' <a class="pw-modal pw-modal-medium" href="' + escape(item.edit_href) + '">Edit <i class="fa fa-edit"></i></a></div>' +
(item.for_inst ? '<div style="color:gray;">for ' + escape(item.for_inst) + '</div>' : '') +
'</div>'
```

**Option:**

```
'<div class="item" style="width:100%;">' +
'<div style="color: black; font-size: 14px;"><span style="font-weight:bold;">' + escape(item.title) + ' (' + escape(item.year) + ')</div>' +
(item.for_inst ? '<div style="color:gray;">for ' + escape(item.for_inst) + '</div>' : '') +
'</div>'
```
