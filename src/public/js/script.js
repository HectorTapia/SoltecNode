


//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

    //FUNCIONES

function anchoPage(){

    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();


    function iniciarSesion(){
        if (window.innerWidth > 850){
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "90px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "510px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }
}

'use strict';

//Validacion de campos de formulario
const form = document.getElementById('form');
const nombre = document.getElementById('nombre_com_us');
const usuario = document.getElementById('nombre_us');
const email = document.getElementById('email_us');
const password = document.getElementById('password');
const password2 = document.getElementById('passwor');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let hasErrors = false;
  hasErrors = checkInputs(usuario, 'No puede dejar el usuario en blanco') || hasErrors;
  hasErrors = checkInputs(nombre, 'No puede dejar el nombre en blanco') || hasErrors;
  hasErrors = checkInputs(email, 'No puede dejar el email en blanco') || hasErrors;
  hasErrors = checkEmail(email) || hasErrors;
  
  hasErrors = checkInputs(password, 'La contraseña no debe estar en blanco') || hasErrors;
  hasErrors = checkInputs(password2, 'La contraseña no debe estar en blanco') || hasErrors;
  hasErrors = checkPasswordMatch(password, password2) || hasErrors;
  // hasErrors = checkEmailBd(email) || hasErrors;

  if (!hasErrors) {
    form.submit();
  }
});

function checkInputs(input, message) {
  const value = input.value.trim();

  if (value === '') {
    setErrorFor(input, message);
    return true;
  } else {
    setSuccessFor(input);
    return false;
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error ';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const emailValue = input.value.trim();
  console.log(emailValue);
  if (!isEmail(emailValue)) {
    setErrorFor(input, 'No ingresó un email válido');
    return true;
  }else {
    setSuccessFor(input);
    return false;
  }
}

// function checkEmail(input) {
//   const pool = require('../database');
//   const emailbdValue = input.value.trim();
//   const rows = pool.query('SELECT * FROM users WHERE email_us = ?', [emailbdValue]);
//   console.log(rows);
//   console.log(emailbdValue);
//     if (rows.length > 0) {
//       setErrorFor(input, 'Ingresó un email ya registrado');
//       return true;
//      }else {
//       setSuccessFor(input);
//       return false;
//     }
  
// }


function checkPasswordMatch(password, password2) {
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  if(password2 === ""){
    setErrorFor(input, message);
  }
  if (passwordValue !== password2Value) {
    setErrorFor(password2, 'Las contraseñas no coinciden');
    return true;
  } else {
    setSuccessFor(password2);
    return false;
  }
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}




// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}

const accordionBtn = document.querySelectorAll('data-accordion-btn');
const accordion = document.querySelectorAll('data-accordion');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

//Ventana Modal
const openModal = document.querySelector('.hero__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
});

