const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/producto', (req, res) => {
    res.render("products/detalles-product");
});

router.get('/car-shop', async (req, res, done) => {
    try {
        const car = await pool.query('SELECT * FROM carrito WHERE user_id = ?', [req.user.id_us]);
      
        // Verificar si la consulta tuvo éxito
        if (car.length > 0) {
          // Código a ejecutar si la consulta fue exitosa
          res.render('products/car-shop', {car}); 
        } else {
          // Código a ejecutar si la consulta no fue exitosa
          console.error("La consulta no fue exitosaaaaa");
          
          // Aquí podrías redirigir a una página de error o mostrar un mensaje de error al usuario
        }
      } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error("Error al ejecutar la consulta:", error);
        
        done(null, false, req.flash('warning', 'Inicie sesion o registrese'));
        res.redirect('/login');
        // Aquí podrías redirigir a una página de error o mostrar un mensaje de error al usuario
      }
});

router.get('/car-shops', async (req, res, done) => {
    try {
        const car = await pool.query('SELECT * FROM carrito WHERE user_id = ?', [req.user.id_us]);
      
        // Verificar si la consulta tuvo éxito
        if (car.affectedRows > 0) {
          // Código a ejecutar si la consulta fue exitosa
         
        } else {
          // Código a ejecutar si la consulta no fue exitosa
          console.error("La consulta no fue exitosaa");
          done(null, false, req.flash('success', 'Sigue agregando productos o revisa tu carrito'));
          res.redirect('/');
          // Aquí podrías redirigir a una página de error o mostrar un mensaje de error al usuario
        }
      } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error("Error al ejecutar la consulta:", error);
        
        done(null, false, req.flash('warning', 'Inicie sesion o registrese'));
        res.redirect('/login');
        // Aquí podrías redirigir a una página de error o mostrar un mensaje de error al usuario
      }
});

router.post('/agregara', async (req, res, done) => {
    const nuevoProducto = req.body;
    const user_id = req.user ? req.user.id_us : null;
    if (!user_id) {
        done(null, false, req.flash('warning', 'Inicie sesion o registrese'));
        res.redirect('/login');
    }
    const values = [nuevoProducto.id_pro, nuevoProducto.nombre_pr, nuevoProducto.descrip_pr, nuevoProducto.price_pr, user_id];
    try {
        const result = await pool.query('INSERT INTO carrito (id_pro, nombre_pr, descrip_pr, price, user_id) VALUES (?, ?, ?, ?, ?)', values);
      
        // Verificar si la consulta tuvo éxito
        if (result.affectedRows > 0) {
          // Código a ejecutar si la consulta fue exitosa
          console.log("La consulta fue exitosa");
          
        } else {
          // Código a ejecutar si la consulta no fue exitosa
          console.error("La consulta no fue exitosa");
          // Aquí podrías redirigir a una página de error o mostrar un mensaje de error al usuario
        }
      } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error("Error al ejecutar la consulta:", error);
        done(null, false, req.flash('warning', 'Inicie sesion o registrese'));
        res.redirect('/login');
        // Aquí podrías redirigir a una página de error o mostrar un mensaje de error al usuario
      }
      
});

router.get('/agregar', async (req, res, done) => {
   
           res.redirect("/car-shop");
          
     
});



router.get('/quitar/:id', async (req, res) => {
        const { id } = req.params;
        await pool.query('DELETE FROM carrito WHERE id_carr = ?', [id]);
        res.redirect('/car-shop'); 
    
});





module.exports = router;