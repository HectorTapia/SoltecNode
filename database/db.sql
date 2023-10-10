CREATE DATABASE db_soltec;

USE db_soltec;

CREATE TABLE users(
    id_us INT(11) NOT NULL,
    nombre_com_us VARCHAR(20) NOT NULL,
    email_us VARCHAR(100) NOT NULL,
    nombre_us VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id_us);

ALTER TABLE users
    MODIFY id_us INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE products(
    id_pr INT(11) NOT NULL,
    nombre_pr VARCHAR(20) NOT NULL,
    description_pr VARCHAR(100) NOT NULL,
    price_pr VARCHAR(15) NOT NULL,
    price_ant_pr VARCHAR(15) NOT NULL,
    image_1_pr BLOB NOT NULL,
    image_2_pr BLOB NOT NULL,
    image_3_pr BLOB NOT NULL,
    image_4_pr BLOB NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
);

ALTER TABLE products
    ADD PRIMARY KEY (id_pr);

ALTER TABLE products
    MODIFY id_pr INT(11) NOT NULL AUTO_INCREMENT;