# InputfieldSelectize
A Inputfield to provide a select interface for Processwire CMS FieldtypePage using the (awesome) Selectize.js jQuery plugin, by Brian Reavis.

Processwire:
[http://processwire.com/](http://processwire.com/)

Selectize:
[https://github.com/selectize/selectize.js](https://github.com/selectize/selectize.js)


## Features

- Custom designed options and items for any page select field.
- Your select options can use any field or subfield on the page, but also sub-subfields, or any data you provide, since you are not limited by tag replacement: you control the precise data supplied to the options using a PHP array that returns data to the module, which is in turn supplied in JSON to the select as a` data-data `attribute.
- The plugin uses the JSON object for each option meaning you can do whatever you want with that data in designing your options/items.
- Each instance lets you define which fields are searchable for the select
- Your selects can use display logic based on the value of any field/data item, for example using ternery conditionals you can avoid empty parenthesis.
- You can design the options and items (what is seen once an option is selected) independently of each other. Therefore you could have special fields on the options for searching, but exclude those on the item. Likewise you can show elements on your item like an edit button which is not needed on the option.
- Multiselect pages are sortable, and deletable by backspace or optional remove button.
- When AceExtended editor is installed, the module will use that for the code input fields.

## Usage

- Install the Module
- Edit your pagefield and choose `InputfieldSelectize` as inputfield.

### Notes
- For examples of what you can do with your selects, view the plugin site at [http://selectize.github.io/selectize.js/](http://selectize.github.io/selectize.js/).
- The plugin theme is selected on the required JquerySelectize module

-----

## Examples

### Basic Example

**PHP:**
```
$data = array(
    'title' => $page->title,
    'company' => $page->company_select ? $page->company_select->title : 'Not set',
    'total' => count($page->recipients),
    'editUrl' => $page->editUrl
);

return $data;
```

**Javascript **(item and option same)
```
'<div class="item">' +
'<span style="display:block;font-size:14px;font-weight:bold;">' + escape(item.title)  + ' (' + escape(item.total) + ')</span>' +
'<span>' + escape(item.company) + '</span>' +
'</div>'
```

!["Screenshot showing the interface of InputfieldChosenSelect"](https://github.com/LostKobrakai/InputfieldChosenSelect/raw/master/screen.png)

**Example screenshot:**
![Example Screenshot](https://github.com/outflux3/InputfieldSelectize/screens/selectize-open.jpg)
 
-----

### A more advanced example

This example shows how to use conditionals for the PHP and JS to get the select options to look clean and provide the necessary information to assist users in choosing the correct options:

![Multi Page](https://github.com/outflux3/InputfieldSelectize/screens/if_selectize_multi-fw.jpg )
 

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


-----
### Example with images

In this example the selects will feature a thumbnail image:
![Page/Image](https://github.com/outflux3/InputfieldSelectize/screens/if_selectize_im.jpg)

You could also set the width of the selected item to 100% depending on where you place the field (e.g. in a column)
![Image width 100](https://github.com/outflux3/InputfieldSelectize/screens/if_selectize_im_fw.jpg)

```
$image = $page->images->first();
$thumb = $image->size(100,100);

$data = array(
	'title'       => $page->title,
    'thumb_src'   => $thumb ->url,
    'img_dims'    => $image->width . 'x' . $image->height,
    'img_desc'    => $image->description,
    'img_size'    => $image->filesizeStr,
    'edit_src'	  => $page->editUrl
);

return $data;
```

```
'<div class="item" style="width:100%;">' +
	'<div class="image-wrapper" style="float:left;"><img src="' + escape(item.thumb_src) + '" alt=""></div>' +
	'<div class="info-wrapper" style="float:left; padding:5px;">' +
    '<span style="font-size:14px;font-weight:bold">' + escape(item.title) + '</span><br>' +
		'<span>Dimensions: ' + escape(item.img_dims) + 'px</span><br>' +
		'<span>Filesize: ' + escape(item.img_size) + '</span><br>' +
		'<span>' + escape(item.img_desc) + '</span><br>' +
		'<a class="pw-modal pw-modal-medium" href="' + escape(item.edit_src) + 
		'">Edit <span class="ui-icon ui-icon-extlink"></span></a></div>' +
'</div>'
```

```
'<div class="item">' +
	'<div class="image-wrapper" style="float:left;"><img src="' + escape(item.thumb_src) + '" alt=""></div>' +
	'<div class="info-wrapper" style="float:left; padding:5px;">' +
    '<span style="font-size:14px;font-weight:bold">' + escape(item.title) + '</span><br>' +
	'</div>' +
'</div>'
```
