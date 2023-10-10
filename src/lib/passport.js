const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.singin', new LocalStrategy({
    usernameField: 'email_us',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email_us, password, done) => {
    
   const rows = await pool.query('SELECT * FROM users WHERE email_us = ?', [email_us]);
   if (rows.length > 0){
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);
    if (validPassword){
        done(null, user, req.flash('success', 'Bienvenido' + user.nombre_us));
    }else {
        done(null, false, req.flash('warning', 'Contraseña incorrecta'));
    }
   }else {
    return done(null, false, req.flash('warning', 'Correo Electronico incorrecto'));
   }

}));

passport.use('local.singup', new LocalStrategy({
    usernameField: 'nombre_us',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre_us, password, done) => {
const {nombre_com_us, email_us} = req.body;
    const newUser = {
        nombre_com_us,
        email_us,
        nombre_us,
        password
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users set ?', [newUser]);
    newUser.id_us = result.insertId;
    
    return done(null, newUser);
    
    // res.redirect('/');

}));

passport.serializeUser((user, done) => {
    done(null, user.id_us);
});

passport.deserializeUser(async (id_us, done) => {
    const rows = await pool.query('SELECT * FROM users Where id_us = ?', [id_us]);
    done(null, rows[0]);
});