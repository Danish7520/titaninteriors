
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema=new Schema({
    name:{type: String},
    Type : {type: String},
    Categories: [
{
    name:"String",
    no_of:"String",
    image:"String",
    price:"number",
    width:"number",
    height:"number",
}
    ]
   

});
module.exports= mongoose.model("Products", productSchema);