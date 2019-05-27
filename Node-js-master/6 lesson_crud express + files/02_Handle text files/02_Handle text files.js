
// fs = File System 
// fs is a part of the "GLOBAL" object in node
const fs=require('fs');

// 1. APPEND TO TEXT FILE: 
/*
"appendFileSync" gets 2 parameters:-
    - A path to a file
    - Content to append to this file

Synchronously append data to a file, 
creating the file if it does not exist.
*/
fs.appendFileSync('text.txt','line 1\n');
fs.appendFileSync('text.txt','line 2\n');
fs.appendFileSync('text.txt','line 3\n');

// 2. READ FROM TEXT FILE:
/*
"readFileSync" gets 1 parameter:-
    - A path to a file

Synchronously gets the content of the requierd file
*/
let res = fs.readFileSync('text.txt').toString();
console.log(res);

// 3. HANDLE TO JSON FILE:
let preValue=[];
//create new file if not exist. 
if(!fs.existsSync('test.json')){
    fs.writeFileSync('test.json','[]');
}
else{
    let res=fs.readFileSync('test.json').toString();
    preValue=JSON.parse(res);
}
// Date.now() = will show the current time in miliseconds.
preValue.push({'Current time:':Date.now()});
fs.writeFileSync('test.json',JSON.stringify(preValue));




