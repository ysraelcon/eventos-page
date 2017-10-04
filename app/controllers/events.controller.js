const Ev=require('../models/event');

module.exports={
  showevS:showevS,
  showsI:showsI,
  seedevS:seedevS,
  shcR:shcR,
  prcR:prcR,
  sheD: sheD,
  preD: preD,
  deleV: deleV
};//exports
  
  
function showevS(req,res){//mostrar eventos
/* //todos los eventos van a ser seeded
const evs=[
 {name:"basquet",slug:"basquetbol",descr:"encestarla"},
{name:"nado",slug:"nado",descr:"Michael Phelps the white shark"},
{name:"levantamiento de pesas",slug:"levante",descr:"hasta 160kg"}
];//evs
*/
  
 Ev.find({}, (err, evs) => {
    if (err) {
      res.status(404);
      res.send('Events not found!');
    }//if error 
  
 res.render('pages/events',{eventos:evs,
                    success: req.flash('success')});
 });//ev.find
}//showeV
  
function showsI(req,res){
 //const ev={name:"baquet",slug:"basquetbol",
//descr:"encestarla"};
  
  Ev.findOne({slug: req.params.slug }, (err, ev) => {
    if (err) {
      res.status(404);
      res.send('Event not found!');
    }//if error
    
  res.render('pages/single',{evento:ev,
          success: req.flash('success')});//manda evento
  });//ev.findone
}//show single, un evento
  
function seedevS(req,res){
const evs=[
 {name:"basqueti",descr:"encestarla"},
{name:"nado",descr:"Michael Phelps the white shark"},
{name:"levantamiento de pesas",descr:"hasta 160kg"},
{name:"Ping Pong",descr:"pin pon pin pon"}
];//evs

  Ev.remove({},()=>{
for(eve of evs){//(eve of evs){
  //console.log(ev);
 var newev =new Ev(eve);
 newev.save();
}//for
  });//remove y agrega a database
res.send('Database seeded!, sembrada?');  
  
}//seedevS  
  
  
function shcR(req, res) {
 res.render('pages/create',{errors: req.flash('errors')});
}//showcreate


function prcR(req, res) {
  // create a new event
  
req.checkBody('name', 'Name is required.').notEmpty();

req.checkBody('description', 'Description is required.').notEmpty();

// if there are errors, redirect and save errors to flash
 const errors = req.validationErrors();
  if (errors) {
   req.flash('errors', errors.map(err => err.msg));
   return res.redirect('/events/create');
}//if  
  
 const ev = new Ev({
  name: req.body.name,
  descr: req.body.description
});
  
ev.save((err) => {
  if (err)
   throw err;

 req.flash('success', 'Successfuly created event!'); 
  
// redirect to the newly created event
 res.redirect(`/events/${ev.slug}`);
});//event save  
}//proceso de crear

function sheD(req, res) {
 Ev.findOne({ slug: req.params.slug }, (err, ev) => {
 res.render('pages/edit', {
   ev: ev,
  errors: req.flash('errors')
});//res.render
});//ev.findone
}//show edit

function preD(req, res) {
 // validate information
 req.checkBody('name', 'Name is required.').notEmpty();
 req.checkBody('description', 'Description is required.').notEmpty();

// if there are errors, redirect and save errors to flash
 const errors = req.validationErrors();
  if (errors) {
   req.flash('errors', errors.map(err => err.msg));
   return res.redirect(`/events/${req.params.slug}/edit`);
  }//if

// finding a current event
 Ev.findOne({ slug: req.params.slug }, (err, ev) => {
 // updating that event
 ev.name        = req.body.name;
 ev.descr = req.body.description;

 ev.save((err) => {
  if (err)
   throw err;

// success flash message
// redirect back to the /events
 req.flash('success', 'Successfully updated event.');
 res.redirect('/events');
});//ev.save
});//ev.findone
}//proceso editar


function deleV(req, res) {
 Ev.remove({ slug: req.params.slug }, (err) => {
// set flash data
// redirect back to the events page
  req.flash('success', 'Event deleted!');
  res.redirect('/events');
 });//ev.remove
}//eliminar evento
