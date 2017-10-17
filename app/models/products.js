
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema=new Schema({
    name:{type: String},
    Type : {type: String},
    Categories: [
{
    name:"String",
    image:"String",
    price:"number",
}
    ]

});
module.exports= mongoose.model("Products", productSchema);