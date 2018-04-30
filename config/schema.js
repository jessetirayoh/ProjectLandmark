var Schema=require("jugglingdb").Schema,schema=new Schema("memory"),Photo=schema.define("Photo",{title:{type:String,length:255},image:{type:JSON}});module.exports=schema;
