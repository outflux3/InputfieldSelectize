var initSelectizeAjax = function() {

    var thisID = $(this).attr('id');
    var optsID = thisID.split('_repeater')[0];

    var itemMarkupJSON = 'InputfieldSelectizeAjax_' + optsID + '.renderItemMarkup';
    eval('var itemMarkup=config.'+itemMarkupJSON);

    var optionMarkupJSON = 'InputfieldSelectizeAjax_' + optsID + '.renderOptionMarkup';
    eval('var optionMarkup=config.'+optionMarkupJSON);

    var configOpts = 'InputfieldSelectizeAjax_' + optsID + '.selectizeOptions';
    eval('var thisOpts=config.'+configOpts);

    var thisInput = $(this);

    var searchUrlBase   = thisInput.attr('data-url'),
        searchLabel     = thisInput.attr('data-label'),
        searchTerms     = thisInput.attr('data-search'),
        searchOp        = thisInput.attr('data-operator'),
        searchFields    = thisInput.attr('data-fields')

    var searchUrl = searchUrlBase + '&display=' + searchFields + '&title' + searchOp;

    thisOpts['render'] = {
        item: function(item, escape) {return eval(itemMarkup);},
        option: function(item, escape) {return eval(optionMarkup);},
    };

    thisOpts['load'] = function(query, callback) {
        if (!query.length) return callback();
        $.ajax({
            url: searchUrl + encodeURIComponent(query),
            type: 'GET',
            error: function() {
                callback();
            },
            success: function(res) {
                //console.log(res);
                console.log(res.matches[0]);
                //console.log(res.matches);
                callback(res.matches);
            }
        });
    }

    $(this).selectize(thisOpts);

};


$(document).ready(function() {

    $(".AdminThemeUikit .InputfieldSelectizeAjax select").removeClass('uk-select');

    $(".InputfieldSelectizeAjax select").each(initSelectizeAjax);

    $(document).on('reloaded opened repeateradd wiretabclick', '.InputfieldPage', function() {
        $(this).find(".InputfieldSelectizeAjax select)").each(initSelectizeAjax);
    });

});

