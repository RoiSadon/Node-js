# Artist Review:
### This is an example of full project. 
##### Using: mySql, node, html+css+js. 

1. mySql: 
    * open xampp and turn on mySql. 
    * open workbench to create DB, and see the changes we make. 

2. node:
    * import packets from npm: mysql, express, body-parser. 
    

## DAL: Data Layer Access:
* this is the only layer that has access to DB directly. s
#####
* import the package 'mysql'
* create connect() function with details that would fit our case.
* create runQuery() function that will run the query to DB, and after executing - will return success/ fail callback. 
note: export of functions.

## BLL: Bussiness Logic Layer:
* this layer is an Application processing. Coordinates data between the UI and DAL.
#####
* import DAL. (so we can use it in our file)
* functions: 
    * connectDb()
    * initDb() - dropTableArtists() - case we already have DB in that name. 
    * dropTableArtists()-with query to DB, and createTableArtists()
    * createTableArtists() - 'create table' query to DB, and insertArtists()
    * insertArtists() - 'insert into' query. call to dal.runQuery(). 
###### CRUD that is used directly from UIL:
    * getArtists() - 'select *' , dal.runQuery()
    * addArtists() - 'insert into' , dal.runQuery()
    * deleteArtist() - 'delete... where' , dal.runQuery()
    * editArtists() - 'update... set...where' , dal.runQuery()
note: export of functions.

## UIL: User Interface Layer:
##### views
* HTML: the viewer can see and do: 
    * table of all artists and info. 
    * Add new Artist
    * Update artist
    * Delete artist
* CSS: I used one from codpan. (changed the background)
* JAVA-SCRIPT: leads the actiond the user did in HTML to functions.
    functions:
    uses the document.getElementById("").value; the user inserted.
    in their end - will call getAllArtist() for refresh. 
    they all have .catch in case of an error!
    * addArtist() - fetch "/api/add" - with "POST" method. 
    * editArtist() - changes the best-song of an artist. 
     fetch "/api/artist/${artistId}" - with "PUT" method.  
    * deleteArtist() - fetch "/api/add" - with "POST" method. 
    * getAllArtist() - fetch "/api/artists" - insert data to table in HTML, using let str="". 
note: we must call  getAllArtist() in the end of the file. otherwise it won't bw activated. 

#### controler.js:
will be responsible for the express using. 
* require = express, body-parser,'../BLL/index'
* functions: 
    * app.get("/home") - main page. will use: (res.sendFile(__dirname + "/views/index.html"))
    * app.get("/api/artists") - call func getArtists()
    * app.post("/api/add") - call func bll.addArtists()
    * app.put("/api/artist/:id") - call func bll.editArtists()
    * app.delete("/api/artist/:id") - call func bll.deleteArtist()
    * app.listen(port number , console.log...) - call functions: bll.connectDb(), 
    bll.initDb()

