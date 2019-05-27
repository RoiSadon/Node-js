const express = require('express');
const bodyParser = require('body-parser');
const bll = require('./../02_BLL/index');
const app = express();

// Use middlewares (app level - not controller level):
// this middleware takes the content of the request`s body, 
//and parses it to json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use middlewares (app level - not controller level):
// this middleware allows to access files in the given folder (this is for css, js, etc...)
app.use(express.static(__dirname+"/views"));

app.get("/home", (req,res)=>{
    res.status(200);
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/api/artists", (req,res)=>{
    bll.getArtists((p2,p3)=>{
        res.status(200);
        res.send(p2);
    },
    (p1)=>{
        res.status(400);
        res.send(p1);
    })
})


app.post("/api/add", (req,res)=>{
    let newArtist = req.body;
    bll.addArtists(newArtist, (p2,p3)=>{
        res.status(201);
        res.send(p2);
    },
    (p1)=>{
        res.status(400);
        res.send(p1);    
    }
    );
})

app.put("/api/artist/:id", (req,res)=>{
    let artistId = req.params.id;
    let updateArtis = req.body;

    bll.editArtists(artistId, updateArtis, (p2,p3)=>{
        res.status(200);
        res.send(p2);
    }, 
    (p1)=>{
        res.status(400);
        res.send(p1);
    })
})

app.delete("/api/artist/:id", (req,res)=>{
    let artistId = req.params.id;

    bll.deleteArtist(artistId, (p2,p3)=>{
        res.status(200);
        res.send(p2);
    },
    (p1)=>{
        res.status(400);
        res.send(p1);
    })
})

app.listen(8080, ()=>{
    bll.connectDb();
    bll.initDb();
    console.log("Server running in 3000 port...");
})