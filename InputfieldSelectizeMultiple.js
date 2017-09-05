var initSelectizeMulti = function() {

	var thisID = $(this).attr('id');
	var optsID = thisID.split('_repeater')[0];

	var itemMarkupJSON = 'InputfieldSelectizeMultiple_' + optsID + '.renderItemMarkup';
	eval('var itemMarkup=config.'+itemMarkupJSON);

	var optionMarkupJSON = 'InputfieldSelectizeMultiple_' + optsID + '.renderOptionMarkup';
	eval('var optionMarkup=config.'+optionMarkupJSON);

	var configOpts = 'InputfieldSelectizeMultiple_' + optsID + '.selectizeOptions';
	eval('var thisOpts=config.'+configOpts);

	thisOpts['render'] = {
		item: function(item, escape) {return eval(itemMarkup);},
		option: function(item, escape) {return eval(optionMarkup);},
	};

	$(this).selectize(thisOpts);

};


$(document).ready(function() {

	$(".InputfieldSelectizeMultiple select[multiple=multiple]").each(initSelectizeMulti);

	$(document).on('reloaded opened repeateradd wiretabclick', '.InputfieldPage', function() {
		$(this).find(".InputfieldSelectizeMultiple select[multiple=multiple]").each(initSelectizeMulti);
	});

});





