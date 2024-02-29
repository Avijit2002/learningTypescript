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
function oneSec(cb: (x: string) => void) {  // specify type of function
    const x: string = "avijit"
    setTimeout(() => cb(x), 1000)
}
function print(name: string) {
    console.log("hii after 1 sec!!!" + name)
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
interface user {
    name: string,
    age: number,
    id: number,
    email?: string  /// optional field
}

// function isEligible(obj:{
//     name: string,
//     age:number,
//     id: number
// }): boolean {
//     if(obj.age>18) return true
//     else return false
// }

function isEligible(obj: user): boolean {
    if (obj.age > 18) return true
    else return false
}
console.log(isEligible(user))


// classes can implement interfaces like java
class A implements user {
    name: string;
    age: number;
    id: number;

    constructor(a: string, b: number, c: number) {
        this.name = a;
        this.age = b;
        this.id = c
    }
}


// Types: Very similar to interfaces , types let you aggregate data together.
type user2 = {
    name: string,
    age: number,
    id: number,
    email?: string  /// optional field
}

// There are some cases where we can only use Types...there use types else use interfaces

// Extra things in types or Difference between types and interface interview question
// 1)
type userID = number | string;
//interface userID = number | string;  Can't do this here.

function printID(id: userID) {  // id can be number or string
    console.log(id)
}
// function printID(id: number | string){  
//     console.log(id)
// }

printID(2)
printID("2")

// 2)
type emoployee = {
    name: string;
    id: number;
}
interface teamlead {
    name: string;
    id: number;
    projectname: string;
}

type manager = emoployee & teamlead;

// Interface : You can implement interfaces in classes, inferfaces can extend another interface but types can't
// Types : You can take intersection and union of type and interfaces


// ------- //
// Arrays in ts

function maxValue(arr: number[]) {
    //logic
}
maxValue([1, 2, 3])


// -------- //
// Enums in TS

// Here we want to restrict the input of keyPress to just 4 values up,down,left,right
// If anything else passed then error
function doSomething(keyPress: string) {
    // logic
}
doSomething("up");
doSomething("down")
// till now we can pass anything

// way - 1

type restrictKey = "up" | "down" | "left" | "right"
function doSomething1(keyPress: restrictKey) {
    // logic
}
//doSomething1("hi") Error
doSomething1("up")

// way - 2 (Enums)

//Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.
//The concept behind an enumeration is to create a human-readable way to represent a set of constant values, which might otherwise be represented as numbers or strings.

enum restrictKey1 {
    up, // by default value 0
    down, // by default value 1
    left = "left", // we can also assign values in runtime
    right = "right"
}
function doSomething2(keyPress: restrictKey1) {
    // logic
    if (keyPress == restrictKey1.up) { // main purpose of enum is we don't use string constants everywahere
        //
    }
}
doSomething2(restrictKey1.up)
console.log(restrictKey1.up) // 0
console.log(restrictKey1.down) // 0


// UseCase of enums in express

import express from "express";
const app = express()

enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}
app.get("/", (req: any, res: any) => {
    if (!req.query.userId) {
        res.status(ResponseStatus.Error).json({})
    }
    // and so on...
    res.status(ResponseStatus.Success).json({});
})


// ---------- //
// Generics

// Why????

function firstEl(arr: (string[] | number[])) {  // dont do this...use generics
    return arr[0];
}
const value = firstEl([2, 3])
value.toUpperCase() // string method can't be called even if value is string  // Here is the problem ts don't know if the value is string or number...if number then toUpperCase() can't be called
// this is the perfect example of why to use TS. if JS is used here, JS will allow it. and it will create bug.


// Generics enable you to create components that work with any data type while still providing compile-time type safety.

function identity<T>(arg: T): T {  // Now this function works with any datatype
    return arg;
}
let output1 = identity<string>("myString");   // data type will be passed along with args
let output2 = identity<number>(100);  // Now ts knows datatype of output 1 and 2 and it will allow output1 to call string methods


function firstEl2<T>(arr: T[]): T {
    return arr[0];
}
let value2 = firstEl2<string>(['hi', 'hello']) // if we want that array must only contain string
// OR
value2 = firstEl2(['hi', 'hello'])  // Ts will auto figure-out type
let value3 = firstEl2([1, 2, 3])
value2.toUpperCase()  ///Problem fixed.... now we can call string method


// ADVANCE APIs

// 1- Pick - used to create a subset type/interface from existing type/interface

interface User {
    readonly id: number,  // readonly studly later
    name: string,
    email: string,
    password: string
}
type updateProp = Pick<User, 'name' | 'email'> // usecase : when we want id and password can't be modified

function updateData(data: updateProp) {

}
// if in future User interface chnages, no need to change in all places

// ------------------------------------------------ //

// 2- Partial - used to create a new type from a exsisting type but all fields optional

type newType = Partial<updateProp>
// usecase : user wants to update details. sometimes he wants all fields to update but sometimes only few

//-------------------------------------------------- //

// 3- READONLY 
// usecase : used with config object that stores api keys, endpoints etc

const a = [1, 2, 3]
a[0] = 5;   // this is a problem, if a is constant so we should not be able to update a

// same for object

// fix
const b: Readonly<number[]> = [1, 2, 3]
// b[0] = 6    //error

function fun2(data : Readonly<User>){

}

// ------------------------------------------------------- //

// 4- Record & Map

// Record used to give type to key value pair object

// type User5 = {
//     [key:string]:{name:string,id:number}
// }

type User5 = Record<string,{name:string,id:number}>

const user5: User5 = {
    "23":{name:"avi",id:4}
}


// Map is just another way of creating key value pair object
const user6 = new Map<string,User>

user6.set("avi",{id:3,name:"avijit",email:"fdfbd",password:"223"})
user6.delete("avi")



// Exclude : creates a new type by excluding some fields from existing ones

// Type inference from zod schema

// type finalUserType = z.infer<typeof zodSchema>  // we export types from backend index file and use in frontend