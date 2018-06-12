<?php


$info = array(
    'title'     => 'Inputfield Selectize', // Module Title
    'author'    => 'Macrura',
    'summary'   => 'Inputfield for the ProcessWire FieldtypePage.', // Module Summary
    'href'      => 'https://processwire.com/talk/topic/13549-selectizejs-modules-family/',
    'icon'      => 'caret-down',
    'version'   => 110,
    'singular'	=> false
    );

if(version_compare($this->config->version, '3.0.67', '<')) {
	$info['requires'] = "JquerySelectize";
}