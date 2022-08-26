# checkout the test.js

```javascript
import { f_evaluate_object } from "./f_evaluate_object.module.js"

var object = {
    n_num: 123,
    s_name: "fritz",
    s_name_and_num: "${(n_num*2) + s_name.toUpperCase()}", 
    f_n_squared: function(n_num) { return parseFloat(n_num)*parseFloat(n_num)},
    n_num_suqared: "${f_n_squared(n_num)}",
    o_nested: {
        n_two : 2,
        n_two_suqared: "${f_n_squared(o_nested.n_two)}",
    }
}

var object_original = Object.assign({}, object)

f_evaluate_object(object, object);

console.log(object_original)
// > {n_num: 123, s_name: 'fritz', s_name_and_num: '${(n_num*2) + s_name.toUpperCase()}', n_num_suqared: '${f_n_squared(n_num)}', f_n_squared: ƒ, …}
console.log(object)
// > {n_num: '123', s_name: 'fritz', s_name_and_num: '246FRITZ', n_num_suqared: '15129', f_n_squared: ƒ, …}
```

