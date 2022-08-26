import { f_evaluate_object } from "./f_evaluate_object.module.js"

var o_test = {

    n: 3, 
    s: "hello", 
    a_n: [1,2,3], 
    a_s: ["one", "two", "three"],
    "${a_s[0]}": "the propname should be 'one'",
    // s_evaluated_value : "${(n+a_n[2]).toString() + s}",
    "${s}_${s}": "the propname of this value was evaluated",
    s_evaluated_nested: "${o_nested.s}+${o_nested.a_n}",
    o_nested: {
        n: 3, 
        s: "hello", 
        a_n: [1,2,3], 
        a_s: ["one", "${o_nested.s}+${o_nested.a_n}", "three"], 
    }
}

f_evaluate_object(o_test,o_test)
console.log("o_test")
console.log(o_test)

var o_test_with_function = {
    f_test: function(num){
        return 10+parseInt(num)
    },
    n_ten: 10,
    n_twenty: "${f_test(n_ten)}"
}

var o_test_with_function_evaluated = f_evaluate_object(o_test_with_function,o_test_with_function)

console.log("o_test_with_function")
console.log(o_test_with_function)


