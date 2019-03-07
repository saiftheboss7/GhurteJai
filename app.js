//DECLARATION
var express 		= require('express');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var login			= require('./controllers/adminLogin');
var home			= require('./controllers/home');
var logout			= require('./controllers/logout');
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
app.use('/logout', logout);

app.use(express.static('assets'));


//ROUTES

app.get('/', function(req, res) {
	res.render('index');

});



//SERVER STARTUP
app.listen(port, ()=>console.log('server started at'+port+"..."));