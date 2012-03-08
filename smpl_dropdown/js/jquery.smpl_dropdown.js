(function($){
  "use strict";
  $.fn.smpl_dropdown = function(options) {

    var defaults = {
      'names'     : ['name1', 'name2'],
      'values'    : ['value1', 'value2'],
      'default'   : null
    }

    var settings = $.extend(true, defaults, options);
    
    // Input validation
    if(settings.names.length !== settings.values.length) {
      throw "array args to smpl_dropdown must be the same length.";
    }
    if(settings.default && $.inArray(settings.default, settings.values) === -1) {
      throw 'Default value ' + settings.default + ' is not in ' + settings.values;
    }

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

    this.append(select);

    return this;
  };
})(jQuery);
