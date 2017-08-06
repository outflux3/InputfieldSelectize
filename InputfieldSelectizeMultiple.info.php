<?php


$info = array(
    'title'     => 'Inputfield Selectize Multiple', // Module Title
    'author'    => 'Macrura',
    'summary'   => 'Inputfield for the ProcessWire FieldtypePage (multi version).', // Module Summary
    'href'      => 'https://processwire.com/talk/topic/13549-selectizejs-modules-family/',
    'version'   => 103,
    'icon'      => 'caret-down',
    'singular'  => true,
    'autoload'  => "template=admin",
    );

if($this->wire('config')->version < '3.0.67') {
	$info['requires'] = "JquerySelectize";
}