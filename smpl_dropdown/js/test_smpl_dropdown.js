$(document).ready(function(){
    "use strict";
    // Do my business
    // Test it.
    var info =  {
        names   : ['A', 'B', 'C'],
        values  : ['a', 'b', 'c'],
        default : 'b'
    };
    
    var info2 =  {
        names   : ['D', 'E', 'F'],
        values  : ['d', 'e', 'f']
    };

    var drop = $('#dropdown_div').smpl_dropdown(info);

    test_dropdown(drop, info, 1);

    drop.setValue('a');
    info.default = 'a';
    test_dropdown(drop, info, 5);

    drop.set(info2);
    info2.default = 'd';
    test_dropdown(drop, info2, 9);

});

var test_dropdown = function(drop, answers, start_num) {
    
    var test_num = start_num;

    testEqual(test_num++, "getValue()", answers.default, drop.getValue());
    
    testEqual(test_num++, "getNames()", answers.names, drop.getNames());
    
    testEqual(test_num++, "getValues()", answers.values, drop.getValues());
    
    testEqual(test_num++, "getValues()", answers.values, drop.getValues());
}

var testEqual = function(test_num, test_desc, reference, given) {
    var text = "Test " + test_num + " - " + test_desc;
    if(JSON.stringify(given) === JSON.stringify(reference)) {
        console.log(text + " passed.");
        return true;
    }else {
        console.warn(text + " failed. Expected, Given", reference, given);
        return false;
    }
}
