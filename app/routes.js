var Products = require("./models/products");
var UserSchema = require("./models/user");
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

     // Products
     app.get('/Products', function(req, res) {
        res.render('Products.ejs'); // load the products.ejs file
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
            console.log("This is new data ",_products);
            res.render('estimation.ejs'); // load the estimation.ejs file
            
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
            console.log("This is new data ",_products);
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
            console.log("This is new data ",_products);
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
            console.log("This is new data ",_Floor);
            // res.render('estimation.ejs', {newdata: _Floor}); // load the estimation.ejs file
            res.json(_Floor)
        })
       
    })


    
    // =======
    // ==============================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
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
         var User = new UserSchema({
            FirstName:req.body.firstName,
            LastName:req.body.lasttName,
            Email :req.body.email,
            Password :req.body.password,
        
            Estimate: [
       
            ]
         });
         User.save(function(err, _user){
             if(err){
                 console.log("There is an error")
             }
             else{
                 console.log("User saved")
                  res.render('index.ejs');
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