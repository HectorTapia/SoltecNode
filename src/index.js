const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');


const { database } = require('./keys');

//initializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'varboxssqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.warning = req.flash('warning');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/cuenta'));
app.use(require('./routes/producto'));
app.use(require('./routes/admin'));
app.use(require('./routes/admin-products')); 
app.use(require('./routes/pago'));
app.use('/cuenta' ,require('./routes/cuenta'));

//Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting Server
app.listen(app.get('port'), () =>{
    console.log('Server en Puerto', app.get('port'));
});


  