//nuevo express routers
const Exs=require('express'),
Rt=Exs.Router(),
mainctrlr=require('./controllers/main.controller'),
evctrlr=require('./controllers/events.controller');

//exportarlo
module.exports=Rt;

//definir rutas
Rt.get('/',mainctrlr.showhM);
/*
Rt.get('/',(req,res)=>{
res.send("mi appp desde routes.js");
});*/

//ruta de eventos
Rt.get('/events',evctrlr.showevS);//todos los eventos


//seed eventos
Rt.get('/events/seed', evctrlr.seedevS);


//crear eventos
Rt.get('/events/create', evctrlr.shcR);
Rt.post('/events/create', evctrlr.prcR)

//editarlos
Rt.get('/events/:slug/edit', evctrlr.sheD);
Rt.post('/events/:slug',     evctrlr.preD);

//borrarlos
Rt.get('/events/:slug/delete', evctrlr.deleV);

//show single evento
Rt.get('/events/:slug',evctrlr.showsI);//un solo evento