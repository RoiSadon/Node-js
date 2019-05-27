
// Use of "GET", "PUT", "UPDATE", "DELETE"

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Use in body-parser to convert data fron client to json in server 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let peopleArray =[];

// 1. "GET":
app.get("/all", (req,res) =>{
    res.status(200);
    res.send(peopleArray);
});

// 2. "POST":
app.post("/add", (req,res)=> {
    peopleArray.push(req.body);     //add to the end of the array
    res.status(201)                 //201 status is - CREATED
    res.send({"message":"added successfully to the list"});
});

// 3. "UPDATE": 
// == app.put
app.put("/edit/:p", (req,res) => {
    let person = peopleArray.find(e => e.name == req.params.p);
    if(person != undefined){
        person.age = req.body.age;
    }
    res.status(200);
    res.send();
});

// 4. "DELETE":
app.delete("/delete/:p", (req,res)=>{
    peopleArray = peopleArray.filter(e=>e.name!=req.params.p);
    res.status(204);         //204 status is EMPTY RESPONSE
    res.send();
});

app.listen(1337, ()=>{console.log("Listening in port 1337")});