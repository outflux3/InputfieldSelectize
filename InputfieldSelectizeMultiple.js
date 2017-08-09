

$(document).on('ready wiretabclick reloaded opened', initSelectize);

function initSelectize(e) {

	$(".InputfieldSelectizeMultiple select").each(function() {

		var thisID = $(this).attr('id');

		var itemMarkupJSON = 'InputfieldSelectizeMultiple_' + thisID + '.renderItemMarkup';
		eval('var itemMarkup=config.'+itemMarkupJSON);

		var optionMarkupJSON = 'InputfieldSelectizeMultiple_' + thisID + '.renderOptionMarkup';
		eval('var optionMarkup=config.'+optionMarkupJSON);

		var configOpts = 'InputfieldSelectizeMultiple_' + thisID + '.selectizeOptions';
		eval('var thisOpts=config.'+configOpts);

		thisOpts['render'] = {
			item: function(item, escape) {return eval(itemMarkup);},
			option: function(item, escape) {return eval(optionMarkup);},
		};

		$(this).selectize(thisOpts);
	});

};

