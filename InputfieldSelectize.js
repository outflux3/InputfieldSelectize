/**
 * JAVASCRIPT VERSION LAST UPDATED 5-4-18
 */

var initSelectize = function() {

	var thisID = $(this).attr('id');
	var optsID = thisID.split('_repeater')[0];

	var itemMarkupJSON = 'InputfieldSelectize_' + optsID + '.renderItemMarkup';
	eval('var itemMarkup=config.'+itemMarkupJSON);

	var optionMarkupJSON = 'InputfieldSelectize_' + optsID + '.renderOptionMarkup';
	eval('var optionMarkup=config.'+optionMarkupJSON);

	var configOpts = 'InputfieldSelectize_' + optsID + '.selectizeOptions';
	eval('var thisOpts=config.'+configOpts);

	thisOpts['render'] = {
		item: function(item, escape) {return eval(itemMarkup);},
		option: function(item, escape) {return eval(optionMarkup);},
	};

	$(this).selectize(thisOpts);

};


$(document).ready(function() {

	$(".AdminThemeUikit .InputfieldSelectize select").removeClass('uk-select uk-form-small uk-form-large');

	$(".InputfieldSelectize select:not([multiple])").each(initSelectize);

	$(document).on('reloaded opened repeateradd wiretabclick', '.InputfieldPage', function() {
		$(this).find(".InputfieldSelectize select:not([multiple])").each(initSelectize);
	});

});


