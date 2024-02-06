// npm init -y
// npx tsc --init

// tsc -b : compiles ts code to js

console.log("hello world!!!")

const x: number = 1;
console.log(x)

// basic Types : number,string,boolean,null,undefined,any

function greet(firstName: string) {
    console.log(`Hello ${firstName}`)
}
greet("Avijit")


// typescript can infer return type of function
function sum(a: number, b: number) {
    return a + b;
}
console.log(sum(2, 3))


function isLegal(age: number): boolean {
    if (age > 18) return true
    else return false
}

// Type Inference : sometime we dont need to specify type. tsc can figure out itself


// Problem : Create a function that take function as args and execute after 1 sec
function oneSec(cb: (x:string) => void) {  // specify type of function
    const x:string = "avijit"
    setTimeout(()=>cb(x), 1000)
}
function print(name:string) {
    console.log("hii after 1 sec!!!"+name)
}
oneSec(print)



// TS-config
//1. The target option in a tsconfig.json file specifies the ECMAScript target version to which the TypeScript compiler will compile the TypeScript code.
//2. rootDir: Where should the compiler look for .ts files. Good practise is for this to be the src folder
//3. outDir: Where should the compiler look for spit out the .js files. Good practise is for this to be the dist folder
//4. noImplicitAny: Try enabling it and see the compilation errors on the following code - (control strictness of codebases)
//5. removeComments:Weather or not to include comments in the final js file

// Add outDir in .gitignore file along with node_modules



// Assign types to objects - Interfaces
const user = {
    name: "avijit",
    age: 22,
    id: 2
}
interface user{
    name: string,
    age:number,
    id: number,
    email?:string  /// optional field
}

// function isEligible(obj:{
//     name: string,
//     age:number,
//     id: number
// }): boolean {
//     if(obj.age>18) return true
//     else return false
// }

function isEligible(obj:user): boolean {
    if(obj.age>18) return true
    else return false
}
console.log(isEligible(user))