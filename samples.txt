$data = array(
    'title' => $page->title,
    'company' => $page->company_select ? $page->company_select->title : 'Not set',
    'total' => count($page->recipients),
    'editUrl' => $page->editUrl
);

return $data;


'<div class="item">' +
'<span style="display:block;font-size:14px;font-weight:bold;">' + escape(item.title)  + ' (' + escape(item.total) + ')</span>' +
'<span>' + escape(item.company) + '</span>' +
'</div>'