// databaseSetup.js
const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.query = promisify(pool.query);

async function createDatabase() {
  try {
    await pool.query('CREATE DATABASE IF NOT EXISTS db_soltec');
    await pool.query('USE db_soltec');
    console.log('Base de datos creada o ya existente. Usando la base de datos.');
  } catch (error) {
    console.error('Error al crear o usar la base de datos:', error);
  }
}

async function createTables() {
  const createUsersBd = `
    CREATE TABLE IF NOT EXISTS users (
      id_us INT NOT NULL AUTO_INCREMENT,
      nombre_com_us VARCHAR(20) NOT NULL,
      email_us VARCHAR(100) NOT NULL,
      nombre_us VARCHAR(20) NOT NULL,
      password VARCHAR(100) NOT NULL,
      PRIMARY KEY (id_us)
    );
  `;

  const createProductsTable = `
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
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id_pr)
    );
  `;

  try {
    await pool.query (createUsersBd);
    await pool.query (createProductsTable);
    console.log('Tablas creadas con éxito.');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  }
}

async function setupDatabase() {
  try {
    await createDatabase();
    await createTables();
  } catch (error) {
    console.error('Error al configurar la base de datos:', error);
  } finally {
    pool.end(); // Cierra la conexión a la base de datos
  }
}

setupDatabase();
