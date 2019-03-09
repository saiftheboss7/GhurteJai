//DECLARATION
var express 		= require('express');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var login			= require('./controllers/adminLogin');
var adminDashboard  = require('./controllers/adminDashboard')
var home			= require('./controllers/home');
var main			= require('./controllers/main');
var logout			= require('./controllers/logout');
var anh             = require('./controllers/adminAddNewHotel');
var viewhotels      = require('./controllers/viewHotels');
var app  			= express();
var port 			= 3000;


//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(exSession({secret: 'my top secret code', saveUninitialized: true, resave: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/login', login);
app.use('/home', home);
app.use('/', main);
app.use('/home', home);
app.use('/logout', logout);
app.use('/admindashboard', adminDashboard);
app.use('/addnewhotel', anh);
app.use('/viewhotels', viewhotels);
app.use('/assets',express.static('assets'));


//ROUTES

// app.get('/', function(req, res) {
// 	res.redirect('/home');

// });



//SERVER STARTUP
app.listen(port, ()=>console.log('server started at'+port+"..."));