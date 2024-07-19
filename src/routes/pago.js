const express = require('express');
const stripe = require('stripe')('sk_test_51OCQCXA889WcHb93C9JF6fd5fZM214NfYJy5V77ODQXyUA4QVYpccWOAQfpJuBRficl69Fquzeckki8FU0d9jP3P00U3WfrglN');
const router = express.Router();

const pool = require('../database');
const nodemon = require('nodemon');

router.post('/pagoform', async(req, res) => {
  const subtotal = req.body.subtotal;
  const total = req.body.total;
  console.log('Subtotal:', subtotal);
    try {
        // Realiza la consulta SQL para buscar el usuario en la base de datos
        const result = await pool.query('SELECT * FROM info_user WHERE useer_id = ?', [req.user.id_us]);
  
        // Verifica si hay algún resultado devuelto por la consulta
        if (result && result.length > 0) {
            const cards = await pool.query('SELECT * FROM info_user');
            console.log("Entro por usuario con tarjeta existente");
            console.log("cards");
            res.render("pagos/pagoresumen", { cards, subtotal, total});
        } else {
            // El usuario no existe en la base de datos, renderiza el formulario de pago
            res.render("pagos/pagoform");
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error al buscar el usuario en la base de datos:', error);
        res.status(500).send('Error interno del servidor');
    }
  // res.render("pagos/pagoresumen", { subtotal, total });
});

router.post('/save-token', async (req, res) => {
  const nuevoInfo = req.body;
  const user_id = req.user.id_us;
  const { nombre, correo, direccion, pais, estado, codigoPostal, nombreTarjeta, token} = req.body;

  // Crea la consulta SQL para insertar los datos en la tabla
  const sql = `INSERT INTO info_user (nombreCompleto_in, correo_in, direccion_in, pais_in, estado_in, cp_in, nom_tar_in, token, useer_id) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  // Ejecuta la consulta SQL con los datos del formulario
  pool.query(sql, [nombre, correo, direccion, pais, estado, codigoPostal, nombreTarjeta, token, user_id], (err, result) => {
    if (err) {
      console.error('Error al insertar los datos en la base de datos: ', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      console.log('Datos del formulario insertados correctamente en la base de datos');
      res.send('Datos del formulario guardados correctamente');
      res.render("pagos/pagoresumen")
    }
  });
});


// router.post('/pago', async (req, res) => {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: 'usd',
//       });
  
//       res.json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error en el servidor');
//     }
//   });

router.post('/pagof', async(req, res) =>{

    // const nuevoPedido = req.body;
    // const user_id = req.user ? req.user.id_us : null;
    // if (!user_id) {
    //     done(null, false, req.flash('warning', 'Inicie sesion o registrese'));
    //     res.redirect('/login');
    // }
    // const values = [nuevoPedido.id_pe, nuevoPedido.nombreCompleto_pe, nuevoPedido.correo_pe, nuevoPedido.direccion_pe, nuevoPedido.calle_entre_pe, nuevoPedido.entre_calle_pe, nuevoPedido.colonia_pe, nuevoPedido.no_int_pe, nuevoPedido.no_ext_pe, nuevoPedido.codigo_postal_pe, nuevoPedido.referencia_pe, nuevoPedido.numero_telef_pe, nuevoPedido.id_producto_pe, nuevoPedido.nombre_producto_pe, nuevoPedido.no_pz_pe, nuevoPedido.monto_pe, user_id];
    // try {
    //     const result = await pool.query('INSERT INTO pedidos (id_pe, nombreCompleto_pe, correo_pe, direccion_pe, calle_entre_pe, entre_calle_pe, colonia_pe, no_int_pe, no_ext_pe, codigo_postal_pe, referencia_pe, numero_telef_pe, id_producto_pe, nombre_producto_pe, no_pz_pe, monto_pe, user_id) VALUES (?, ?, ?, ?, ?)', values);
      
    //     // Verificar si la consulta tuvo éxito
    //     if (result.affectedRows > 0) {
    //       // Código a ejecutar si la consulta fue exitosa
    //       console.log("La consulta fue exitosa");
          
    //     } else {
    //       // Código a ejecutar si la consulta no fue exitosa
    //       console.error("La consulta no fue exitosa");
    //       // Aquí podrías redirigir a una página de error o mostrar un mensaje de error al usuario
    //     }
    //   } catch (error) {
    //     // Manejar cualquier error que ocurra durante la consulta
    //     console.error("Error al ejecutar la consulta:", error);
    //     done(null, false, req.flash('warning', 'Inicie sesion o registrese'));
    //     res.redirect('/login');
    //     // Aquí podrías redirigir a una página de error o mostrar un mensaje de error al usuario
    //   }
      
    const { nombreCompleto_pe, correo_pe, direccion_pe, calle_entre_pe, entre_calle_pe, colonia_pe, no_int_pe, no_ext_pe, codigo_postal_pe, referencia_pe, numero_telef_pe, id_producto_pe, nombre_producto_pe, no_pz_pe, monto_pe } = req.body;
    const newPedido = {
      nombreCompleto_pe, correo_pe, direccion_pe, calle_entre_pe, 
      entre_calle_pe, colonia_pe, no_int_pe, no_ext_pe, codigo_postal_pe, 
      referencia_pe, numero_telef_pe, id_producto_pe, nombre_producto_pe, 
      no_pz_pe, monto_pe
    };
    console.log(newPedido)
    await pool.query('INSERT INTO pedidos set ?', [newPedido]);
    console.log("Entro por usuario con tarjeta existente");
    res.render("index")
});



module.exports = router;