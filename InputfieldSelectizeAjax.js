var initSelectizeAjax = function() {

    var thisInput = $(this);
    if (thisInput.hasClass('selectized')) return;

    // repeater items use the config of the field they belong to
    var thisID = thisInput.attr('id');
    var jsConfig = ProcessWire.config['InputfieldSelectizeAjax_' + thisID] ||
        ProcessWire.config['InputfieldSelectizeAjax_' + thisID.split('_repeater')[0]];
    if (!jsConfig) return;

    var itemMarkup   = jsConfig.renderItemMarkup,
        optionMarkup = jsConfig.renderOptionMarkup,
        thisOpts     = $.extend(true, {}, jsConfig.selectizeOptions); // own copy: repeater items share the config

    var searchUrlBase   = thisInput.attr('data-url'),
        searchTerms     = thisInput.attr('data-search') || 'title',
        searchOp        = thisInput.attr('data-operator') || '%=',
        searchFields    = thisInput.attr('data-fields') || 'title';

    // same query format as core InputfieldPageAutocomplete: &field1,field2%=value
    var searchUrl = searchUrlBase + '&display=' + searchFields + '&' + searchTerms + searchOp.replace(/%/g, '%25');

    var render = {};
    if (itemMarkup) render.item = function(item, escape) { return eval(itemMarkup); };
    if (optionMarkup) render.option = function(item, escape) { return eval(optionMarkup); };
    thisOpts['render'] = render;

    // ProcessPageSearch has already matched the query against the search fields, which the
    // results may not contain, so show what it returned rather than filtering again here
    var serverHits = {};
    thisOpts['score'] = function(query) {
        var hits = serverHits[$.trim(query)];
        return function(item) { return hits && hits[item.id] ? 1 : 0; };
    };

    thisOpts['load'] = function(query, callback) {
        var self = this;
        query = $.trim(query);
        if (!query.length) return callback();
        $.ajax({
            url: searchUrl + encodeURIComponent(query),
            type: 'GET',
            error: function() {
                callback();
            },
            success: function(res) {
                var matches = res && res.matches ? res.matches : [];
                var hits = {};
                $.each(matches, function(i, match) { hits[match.id] = true; });
                serverHits[query] = hits;
                // results scored before they arrived are cached under this query, and
                // Selectize only clears that cache for options it hasn't seen before
                self.lastQuery = null;
                callback(matches);
            }
        });
    };

    thisOpts['valueField'] = 'id';

    thisInput.selectize(thisOpts);

    // optional placeholder once items are selected (Selectize removes it after the first item)
    var more = thisInput.attr('data-placeholder-more');
    var s = this.selectize;
    if (more && s) {
        var empty = s.settings.placeholder || '';
        s.updatePlaceholder = function() {
            this.$control_input.attr('placeholder', this.items.length ? more : empty);
            this.$control_input.triggerHandler('update', {force: true}); // auto-grow measures the placeholder
        };
        s.updatePlaceholder();
    }

};


$(document).ready(function() {

    var selector = 'select.InputfieldSelectizeAjax, input.InputfieldSelectizeAjax';

    $(".AdminThemeUikit .InputfieldSelectizeAjax").filter(selector).removeClass('uk-select uk-input uk-form-small uk-form-large');
    $(selector).each(initSelectizeAjax);

    $(document).on('reloaded opened repeateradd wiretabclick', '.InputfieldPage', function() {
        $(this).find(selector).not('.selectized').each(initSelectizeAjax);
    });

});
