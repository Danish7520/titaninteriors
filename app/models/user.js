
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema=new Schema({
    FirstName:{type: String},
    LastName : {type: String},
    Email : {type: String},
    Password : {type: String},

    Estimate: [
// {
//     // product_id:"String",
//     // category_id:"String",
//     // width:"number",
//     // height:"number",
//     // total_cost:"number",
//     // total_material:"number"
// }
    ],
    History: [
        // {
        //     width:"number",
        //     height:"number",
        //     price:"number",
        //     name:"String",
        //     cost:"number",
        //     totalcost:"number",
        //     no_of_rolls:"number",
        //     no_of_rolls2:"number",
        // }
            ]

});
module.exports= mongoose.model("users", UserSchema);

// // app/models/user.js
// // load the things we need
// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// // define the schema for our user model
// var userSchema = mongoose.Schema({

//     local            : {
//         email        : String,
//         password     : String,
//     },
//     facebook         : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     },
//     twitter          : {
//         id           : String,
//         token        : String,
//         displayName  : String,
//         username     : String
//     },
//     google           : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     }

// });

// // methods ======================
// // generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// // create the model for users and expose it to our app
// module.exports = mongoose.model('User', userSchema);