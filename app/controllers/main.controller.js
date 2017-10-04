module.exports={
  showhM:showhM
  };//module
  
//show homepage
function showhM(req,res){ //show home
  res.render('pages/home');
  //res.send("mi app desde main controller");
}//show home

