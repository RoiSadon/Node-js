const express=require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app=express();

// create json file if not exist.
if(!fs.existsSync('people.json')){
    fs.writeFileSync('people.json','[]');
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// GET - Select all:
app.get('/all',(req,res)=>{
    let a = fs.readFileSync('people.json').toString();
    res.status(200);
    res.send(JSON.parse(a));
});

// POST - create:
app.post('/add',(req,res)=>{
    let a = fs.readFileSync('people.json').toString();
    let peopleArray = JSON.parse(a);
    peopleArray.push(req.body);
    fs.writeFileSync('people.json',JSON.stringify(peopleArray));
    res.status(201); // created
    res.send({"message:":"added succesfully"});
});

// PUT- Update:
app.put('/edit/:p', (req,res)=>{
    let a = fs.readFileSync('people.json').toString();
    let peopleArray = JSON.parse(a);
    let person = peopleArray.find(e=>{e.name==req.params.p});
    if(person!=undefined){
        person.age=req.body.age;
        fs.writeFileSync('people.json',JSON.stringify(peopleArray));
    }
    res.status(200);
    res.send();
});

app.delete('delete/:p',(req,res)=>{
    let a=fs.readFileSync('people.json').toString();
    let peopleArray = JSON.parse(a);
    peopleArray = peopleArray.filter(e=>{e.name!=req.params.p})
    fs.writeFileSync('people.json',JSON.stringify(peopleArray));
    res.status(204); //204 is empty res
    res.send();
});

app.listen(4500,()=>{console.log("listening in 4500 port")});













