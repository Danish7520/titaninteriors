var Products = require("./models/products");
var users = require("./models/user");
// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    // contacts
    app.get('/contacts', function(req, res) {
        res.render('contacts.ejs'); // load the contacts.ejs file
    });

     // VR
     app.get('/VR', function(req, res) {
        res.render('VR.ejs'); // load the products.ejs file
    });
    
    // estimation
    app.get('/estimation', function(req, res) {
        Products.find({Type:"Wall"},function(err,_products){
            if (err){
                console.log("error", err);
            }
            else{
                // console.log(data);                
                console.log("not error", _products);

            }
            // console.log("This is new data ",_products);
            res.render('estimation.ejs'); // load the estimation.ejs file
            
        })
    });

 // history
 app.get('/history', function(req, res) {
   res.render('history.ejs')
});

 // searchhistory
 app.post('/searchhistory', function(req, res) {
     console.log("ggggggggggggggggggggggggggggggggg",req.body)
    users.findOne({_id:req.body.id},function(err,_user){
        if(err){
            console.log("error",err)
        }
        else{
            try{
                res.json(_user.History.reverse())
            }
            catch(E){
                console.log("error occeur");
                res.send("")
            }
            
        }

    })
    
 });


     // about
     app.get('/about', function(req, res) {
        res.render('about.ejs'); // load the about.ejs file
    });
    
    /// Wall
    app.get("/Wall",function(req,res){
        console.log("abcd")
        Products.find({Type:"Wall"},function(err,_products){
            if (err){
                console.log("error", err);
            }
            else{
                // console.log(data);                
                console.log("not error", _products);

            }
            // console.log("This is new data ",_products);
           // res.render('estimation.ejs', {newdata: _products}); // load the estimation.ejs file
             res.json(_products)
        })
        // res.render('estimation.ejs', {newdata: _products}); // load the estimation.ejs file
       
    })

     /// Window
     app.get("/Window",function(req,res){
        console.log("abcd")
        Products.find({Type:"Window"},function(err,_products){
            if (err){
                console.log("error", err);
            }
            else{
                // console.log(data);                
                console.log("not error", _products);

            }
            // console.log("This is new data ",_products);
            // res.render('estimation.ejs', {newdata: _products}); // load the estimation.ejs file
            res.json(_products)
            //res.render('estimation.ejs', {newdata: _products}); // load the estimation.ejs file
        })
       
    })

     /// Floor
     app.get("/Floor",function(req,res){
        console.log("abcd")
        Products.find({Type:"Floor"},function(err,_Floor){
            if (err){
                console.log("error", err);
            }
            else{
                // console.log(data);                
                console.log("not error", _Floor);

            }
            // res.render('estimation.ejs', {newdata: _Floor}); // load the estimation.ejs file
            res.json(_Floor)
        })
       
    })

     /// Save
     app.post("/save",function(req,res){
        console.log("alllllllllllllllllllllllllllllllllllllllllllllllllllllllllbcd",req.body);
        var date=new Date();
        var day = date.getDate();
        var month=date.getMonth()+1;
        var year = date.getFullYear();
        var d = day+"/"+month+"/"+year;
        users.findOneAndUpdate({_id:req.body.id},{$push:{History:{           
        width:req.body.width,
        height:req.body.height,
        type:req.body.type,
        price:req.body.price,
        name:req.body.name,
        cost:req.body.cost,
        totalcost:req.body.totalcost,
        no_of_rolls:req.body.no_of_rolls,
        no_of_rolls2:req.body.no_of_rolls2,
        date:d
        }
    }},function(err,_user){
        if(err)(
            console.log("error",err)
        )
        else{
            console.log("user updated",_user)
            res.json(_user)
        }
    })
       
    })


    
    // =======
    // ==============================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs'); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
 app.post('/login', function(req,res){
     console.log("hdfjhghj", req.body)
     users.findOne({
         Email:req.body.email,
         Password:req.body.password
     },function(err,_user){
         if(err){
             console.log("error");
         }
         else{
             console.log("jkdfhsbbjb",_user)
             if(!_user){
                
                res.json(_user);
             }
             else{
                 res.json(_user);
             }
         }
     })
 });
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs' );
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
   // process the signup form
    app.post('/signup',function(req,res){
         console.log(req.body, "huhuhyhuyhu")
         var User = new users({
            FirstName:req.body.firstname,
            LastName:req.body.lastname,
            Email :req.body.email,
            Password :req.body.password,
        
            Estimate: [
       
            ]
         });
         users.findOne({
             Email:req.body.email
         },function(err,user){
             if(err){
                 console.log("error",err)
             }
             else{
                 if(user){
                     console.log("already")
                     res.send("email already exist")
                 }
                 else{
                    User.save(function(err, _user){
                        if(err){
                            console.log("There is an error")
                        }
                        else{
                            console.log("User saved")
                             res.json(_user);
                        }
                    })    
                 }
             }
         })
        
        
        })
    


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('*', function(req, res) {
        res.redirect('/');
    });





};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}