Example of array to be used by the select
```
$data = array(
    'title' => $page->title,
    'company' => $page->company_select ? $page->company_select->title : 'Not set',
    'total' => count($page->recipients),
    'editUrl' => $page->editUrl
);

return $data;
```

Javascript Example for item and option:
```
'<div class="item">' +
'<span style="display:block;font-size:14px;font-weight:bold;">' + escape(item.title)  + ' (' + escape(item.total) + ')</span>' +
'<span>' + escape(item.company) + '</span>' +
'</div>'
```