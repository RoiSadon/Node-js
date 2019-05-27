const express=require('express');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
let arr=[];

// Select all:
app.get('/all',(req,res)=>{
    res.status(200);
    res.send(arr);
});

// Insert into:
app.post('/all',(req,res)=>{
    arr.push(req.body);
    res.status(201); // 201 is created
    res.send({"message":"added succesfully to the list"}); 
});

// Update
app.put('/update/:p',(req,res)=>{
    let person = arr.find(e=>{e.name==e.params.p});
    if(person!=undefined){
        person.age = req.body.age;
    }
    res.status(200);
    res.send();
});

// Delete:
app.delete('/delete/:p',(req,res)=>{
    arr=arr.filter(e=>{e.name !=req.params.p});
    res.status(204); //204 is empty response
    res.send();
});

app.listen(4500,()=>{console.log("listening in port 4500...")});











