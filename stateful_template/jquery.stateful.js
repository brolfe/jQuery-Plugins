(function($){
    "use strict";

    // Private Stuff
    var instanceKey = 'statefulPlugin'; 

    var getInstance = function(self) {
        return $.data(self[0], instanceKey);
    };

    var setInstance = function(instance, self)  {
        $.data(self[0], instanceKey, instance);
    };

    // The Instance
    var Instance = function(options, element) {
        this.settings = $.extend(true, {}, Instance.defaults, options);
        this.$element = element;
        this.init();
    };

    Instance.defaults = {};

    Instance.prototype =  {
        init: function() {
            // Do plugin stuff.
            this.$element.addClass('statefulPlugin');
            this.$element.text(this.settings.text);
        },
        publicMethod: function(param) {
            // Modify state somehow
            // Possibly modify this.element
            // Do whatever
            this.styleClass = param;
            this.$element.addClass(this.styleClass);
        },

        publicGetter: function() {
            return this.styleClass;
        }
    }

    // Publicly Accessible Methods
    var methods =  {
        init: function(options) {
            this.each(function(){
                var $this = $(this);
                var instance = getInstance($this);
                if(!instance) {
                    instance = new Instance(options, $this);
                    setInstance(instance, $this);
                }
            });
            return this;
        },

        publicMethod: function(param) {
            this.each(function(){
                var $this = $(this);
                getInstance($this).publicMethod(param);
            });
            return this;
        },

        publicGetter: function() {
            // Returns the result from the last element in the collection
            var retVal;
            this.each(function(){
                var $this = $(this);
                retVal = getInstance($this).publicGetter();
            });
            return retVal;
        }
    };
    
    // Define Plugin
    $.fn.statefulPlugin = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            console.warn('Method ' + method + ' does not exist on plugin');
        }
    };
}).call(this, jQuery);
