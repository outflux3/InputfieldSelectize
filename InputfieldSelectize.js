$(document).ready(function() {

	$(".InputfieldSelectize select:not([multiple])").each(function() {

		var thisID = $(this).attr('id');

		var itemMarkupJSON = 'InputfieldSelectize_' + thisID + '.renderItemMarkup';
		eval('var itemMarkup=config.'+itemMarkupJSON);

		var optionMarkupJSON = 'InputfieldSelectize_' + thisID + '.renderOptionMarkup';
		eval('var optionMarkup=config.'+itemMarkupJSON);

		var configOpts = 'InputfieldSelectize_' + thisID + '.selectizeOptions';
		eval('var thisOpts=config.'+configOpts);

		thisOpts['render'] = {
			item: function(item, escape) {return eval(itemMarkup);},
			option: function(item, escape) {return eval(optionMarkup);},
		};

		$(this).selectize(thisOpts);

	});

});

