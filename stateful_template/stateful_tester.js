!function($) {
    $(function(){
        $('#test_div1').statefulPlugin({text: "One"});
        $('#test_div2').statefulPlugin({text: "Two"});
        $('#test_div1').statefulPlugin("publicMethod", "red");
        console.log($('#test_div1').statefulPlugin("publicGetter"));

        $('p').statefulPlugin({text: "p tags"});
        $('p').first().statefulPlugin('publicMethod', "blue");

    });
}.call(this, jQuery);
