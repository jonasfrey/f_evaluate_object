
var f_s_evaluated = function(
    s_string, 
    o_object
){
    if(s_string.includes){
        if(!s_string.includes("${")){
            return s_string
        }
    }
    var s_function_body = "return `"+s_string+"`"
    // console.log(s_function_body)

    // var a_s_param = Object.keys(o_object).filter(s=>!s.includes("${"))
    var a_s_param = []
    var a_value_param = []
    for(var s_prop_name in o_object){
        if(s_prop_name.includes){
            if(!s_prop_name.includes("${")){
                a_s_param.push(s_prop_name)
                a_value_param.push(o_object[s_prop_name])
            }
        }
    }
    var f_s_evaluate = new Function(
        ...a_s_param, s_function_body    
    )
    
    // var s_string_interpolated = f_s_evaluate(...Object.values(o_object))
    var s_string_interpolated = f_s_evaluate(...a_value_param)
    return s_string_interpolated
}

var f_evaluate_object = function(o_object, o_object_source){
    for(var s_prop_name in o_object){

        var value = o_object[s_prop_name]
        // console.log(s_prop_name, o_object_source)
        var s_prop_name_evaluated = f_s_evaluated(s_prop_name, o_object_source)
        // console.log(s_prop_name_evaluated)
        
        o_object[s_prop_name_evaluated] = o_object[s_prop_name]
        if(typeof value == 'function'){
            continue
        }
        if (
            typeof value === 'object' &&
            value !== null //&&
            // !Array.isArray(value)
          ) {
            o_object[s_prop_name_evaluated] = f_evaluate_object(value, o_object_source)
        }else{
            var value_evaluated = f_s_evaluated(value, o_object_source)
            o_object[s_prop_name_evaluated] = value_evaluated
        }
        
        if(s_prop_name_evaluated != s_prop_name){
            // the old unevaluated property name could be deleted if it was evaluated
            delete o_object[s_prop_name]
        }
    }

    return o_object

}

export {f_evaluate_object}