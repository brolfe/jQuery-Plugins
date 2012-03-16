(function($){
"use strict";

$.fn.smpl_dropdown = function(options) {
    // Check to see if this element already has an smpl_drop instance
    var smpl_drop = this.get_smpl_drop();
    if( smpl_drop ) {
        // This element already has a smpl_drop
        return smpl_drop;
    }

    // Create a smpl_drop instance and put it in element storage
    // TODO smpl_drop uses no options at this point...
    smpl_drop = new $.smpl_drop({}, this[0]);
    $.data(this[0], 'smpl_drop', smpl_drop);

    smpl_drop.set(options);

    return smpl_drop;
};

$.fn.get_smpl_drop = function() {
    return $.data(this[0], 'smpl_drop');
}

// Constructor
$.smpl_drop = function(options, element) {
    this.settings = $.extend( true, {}, $.smpl_drop.defaults, options );
    this.element = element;
    this.init();
};

$.smpl_drop.defaults =  {};

$.smpl_drop.validateSettings = function(settings) {
    // Input validation
    if(settings.names.length !== settings.values.length) {
      throw "array args to smpl_dropdown must be the same length.";
    }
    if(settings.default && $.inArray(settings.default, settings.values) === -1) {
      throw 'Default value ' + settings.default + ' is not in ' + settings.values;
    }
};

$.smpl_drop.prototype =  {
    init: function() {
        //TODO 
    },

    // Public
    getValue: function() {
        return $(this.select).val();
    },

    // Public
    getNames: function() {
        var names = [];
        var options = this.getOptionElements();
        $.each(options, function(index, opt){
            names.push($(opt).text());
        });
        return names;
    },

    // Public
    getValues: function() {
        var values = [];
        var options = this.getOptionElements();
        $.each(options, function(index, opt){
            values.push($(opt).val());
        });
        return values;
    },

    set: function(options) {

        // Clear old smpl dropdowns
        if(this.select) {
            this.select.detach();
        }

        var defaults = {
          'names'     : ['name1', 'name2'],
          'values'    : ['value1', 'value2'],
          'default'   : null
        }

        var settings = $.extend(true, defaults, options);
       
        $.smpl_drop.validateSettings(settings);

        // Create the dropdown
        var select = $('<select>', {
          'class' : 'smpl_dropdown'
        });

        $.each(settings.names, function(index, name_text){
          select.append($('<option>', {
            'text'    : name_text,
            'value'   : settings.values[index]
          }));
        });
      
        if(settings.default) {
          select.val(settings.default);
        }

        $(this.element).append(select);
        this.select = select;
    },

    // Public
    setValue: function(new_val) {
        if($.inArray(new_val, this.getValues()) > -1) {
            this.select.val(new_val);
        }else {
            throw "Cannot set to that val.";
        }
    },

    getOptionElements: function() {
        return $(this.select).find('option');
    }
}

})(jQuery);
