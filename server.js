// server.js
// where your node app starts

//environment variables
require('dotenv').config();


//1grab dependencies, 2set the app, 3 set routes, 4 start server

// init project
const Exs = require('express'),
A = Exs(), //app
port=process.env.PORT||8080,//3000;
Exprlay=require('express-ejs-layouts'),
Mng=require('mongoose'),
Bdp=require('body-parser'),
Ss = require('express-session'),
ckp= require('cookie-parser'),
Fl= require('connect-flash'),
expv= require('express-validator');      
      
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

//set the app======
// set sessions and cookie parser
A.use(ckp());
A.use(Ss({
 secret: process.env.SECRET, 
 cookie: { maxAge: 60000 },
 resave: false,    // forces the session to be saved back to the store
 saveUninitialized: false  // dont save unmodified
}));//usar session
A.use(Fl());


// tell express where to look for static assets
A.use(Exs.static(__dirname+'/public'));

//ejs engine====
A.set("view engine","ejs");
A.use(Exprlay);

//database=======
Mng.connect(process.env.DB_URI, {useMongoClient:true});

//bodyparser para grabar info del form
A.use(Bdp.urlencoded({extended:true}));
A.use(expv());

//rutas========
// http://expressjs.com/en/starter/static-files.html
//A.use(express.static('public'));
A.use(require('./app/routes'));

// http://expressjs.com/en/starter/basic-routing.html
/*
A.get("/", (req, res)=>{
  //res.send("mando de la app.get");
  res.sendFile(__dirname + '/views/index.html');
  
});
*/
A.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
A.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
//var listener = 
A.listen(process.env.PORT, function () {
  console.log('la app escuchando en puerto:' + port); //listener.address().port
});
