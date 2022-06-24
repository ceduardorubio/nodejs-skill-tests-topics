import { strict as assert} from 'assert';
let a = {
    name: "John",
    age: 30,
    info :{
        status: "active",
        hobbies: ["Sports", "Cooking"]
    }
}
let b = {
    name: "John",
    age: 30,
    info :{
        status: "inactive",
        hobbies: ["Sports", "Cooking"]
    }
}

try {
    assert.deepEqual(a, b);
} catch (error) {
    console.log(error);
}

console.log("Assertion process test is still running");