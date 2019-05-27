const dal = require('./../01_DAL/index');

function connectDb(){
    return dal.connect();
}

function initDb(){
    dropTableArtists();
}

function dropTableArtists(){
    let query = "DROP TABLE IF EXISTS `Artists`";

    dal.runQuery(query,
        (res,extra)=>{createTableArtists()},
        (err)=>{console.log("sorry error",err)}
        );
}

function createTableArtists(){
    let query = "CREATE TABLE `Artists`("+
    "`name`        NVARCHAR(30)            NOT NULL,"+
    "`category`    ENUM('trance','celtic', 'pop','country','rap','traditional')  NOT NULL DEFAULT 'pop',"+
    "`country`     VARCHAR(30)           NOT NULL DEFAULT '',"+
    "`best_song`   NVARCHAR(256)          NOT NULL DEFAULT '',"+
    "PRIMARY KEY (`name`) );";

    dal.runQuery(query,
        (res, extra) => { insertArtists()},
        (err) => { console.log("sorry err", err) }
    );
}

function insertArtists(){
    let query ="INSERT INTO `Artists` values"+
    `('Jah Khalib', 'rap', 'Kazachstan', 'Лейла'),
    ('Idan Raichel', 'traditional', 'Israel', 'Mon amoure'),
    ('Вера Брежнева', 'pop', 'Russia', 'Любите друг друга'),
    ('Adrian Von Ziegler', 'celtic', 'Switzerland', 'Woodland Tales'),
    ('Menumas', 'trance', 'Israel', 'He Has Music');`;


    dal.runQuery(query, 
        (res,extra)=>{console.log(res,extra)},
        (err)=>{console.log("error!",err)}
        );
}

// CRUD that is usedd direc from UIL:

function getArtists(successCallBack, failCallBack){
    let query = "SELECT * FROM `Artists`";
    dal.runQuery(query,successCallBack, failCallBack);
}

function addArtists(newArtist,successCallBack, failCallBack){
    let query = "INSERT INTO `Artists` VALUES"+
    `('${newArtist.name}','${newArtist.category}','${newArtist.country}','${newArtist.best_song}')`
    dal.runQuery(query,successCallBack, failCallBack);
}

function deleteArtist(artistID,successCallBack, failCallBack){
    let query = "DELETE  FROM `Artists`"+
    `WHERE name = '${artistID}'`;
    dal.runQuery(query,successCallBack, failCallBack);
}

function editArtists(artistID,updateArtist,successCallBack, failCallBack){
    let query ="UPDATE `Artists`"+
    `SET best_song = '${updateArtist.best_song}' WHERE name = '${artistID}'`;
    dal.runQuery(query,successCallBack, failCallBack);
}

//--------------------------------------------------------------------------------------
module.exports = {
    "connectDb": connectDb,
    "initDb": initDb,
    "getArtists":getArtists,
    "addArtists":addArtists,
    "deleteArtist":deleteArtist,
    "editArtists":editArtists
}