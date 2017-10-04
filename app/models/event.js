const Mng=require('mongoose'),
 Sch=Mng.Schema;

//crear esquema
const evsch=new Sch({
 name:String,
slug:{
 type:String, unique:true},
descr:String
});//esquema

//middleware----
evsch.pre('save',function(next){
 this.slug=slugify(this.name);
 next();
});//asegurar el nombre que se guarde


//crear modelo
const evmdl=Mng.model('Ev',evsch);

module.exports=evmdl

function slugify(tx){
 return tx.toString().toLowerCase()
.replace(/\s+/g,'-')
.replace(/[^\w-]+/g, '')
.replace(/\-\-+/g, '-')
.replace(/^-+/, '')
.replace(/-+$/, '');
}//slugify