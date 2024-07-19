const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TOO MANY CONNECTIONS');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }

  if (connection) connection.release();
  console.log('DATABASE IS CONNECTED');
});

pool.query('CREATE DATABASE IF NOT EXISTS db_soltec', (err) => {
    if (err) {
      console.error('Error al crear la base de datos:', err);
    } else {
      console.log('Base de datos creada o ya existente.');
  
      // Utiliza la base de datos recién creada
      pool.query('USE db_soltec', (err) => {
        if (err) {
          console.error('Error al usar la base de datos:', err);
        } else {
          console.log('Usando la base de datos.');
  
          const createStructureUserBD = `
            CREATE TABLE IF NOT EXISTS users (
              id_us INT NOT NULL AUTO_INCREMENT,
              nombre_com_us VARCHAR(20) NOT NULL,
              email_us VARCHAR(100) NOT NULL,
              nombre_us VARCHAR(20) NOT NULL,
              password VARCHAR(100) NOT NULL,
              PRIMARY KEY (id_us)
            );
          `;
          const createStructureProductBD = `
          CREATE TABLE IF NOT EXISTS products (
            id_pr INT NOT NULL AUTO_INCREMENT,
            nombre_pr VARCHAR(50) NOT NULL,
            description_pr VARCHAR(300) NOT NULL,
            price_pr VARCHAR(15) NOT NULL,
            price_ant_pr VARCHAR(15) NOT NULL,
            image_1_pr BLOB NOT NULL,
            image_2_pr BLOB NOT NULL,
            image_3_pr BLOB NOT NULL,
            image_4_pr BLOB NOT NULL,
            user_id INT(11),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id_pr),
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id_us)
          ); 
          `;

  
          

   
          // Utiliza la conexión actual para crear las tablas
          pool.query(createStructureUserBD, createStructureProductBD, (err) => {
            if (err) {
              console.error('Error al crear las tablas:', err);
            } else {
              console.log('Tablas creadas con éxito.');
            }
  
            // Cierra la conexión a la base de datos
            
          });
        }
      });
    }
  });

pool.query = promisify(pool.query);

module.exports = pool;
