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
    nombre_pr VARCHAR(50) NOT NULL,
    description_pr VARCHAR(300) NOT NULL,
    price_pr VARCHAR(15) NOT NULL,
    price_ant_pr VARCHAR(15) NOT NULL,
    image_1_pr BLOB NOT NULL,
    image_2_pr BLOB NOT NULL,
    image_3_pr BLOB NOT NULL,
    image_4_pr BLOB NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE products
    ADD PRIMARY KEY (id_pr);

ALTER TABLE products
    MODIFY id_pr INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE carrito(
    id_carr INT(11) NOT NULL,
    id_pro INT(11) NOT NULL,
    nombre_pr VARCHAR(50) NOT NULL,
    descrip_pr VARCHAR(300) NOT NULL,
    cantidad_pr VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    user_id INT(11),
    CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id_us),
    CONSTRAINT id_pro FOREIGN KEY (id_pro) REFERENCES products(id_pr)
);

ALTER TABLE carrito
    ADD PRIMARY KEY (id_carr);


ALTER TABLE carrito
    MODIFY id_carr INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE info_user(
    id_in INT(11) NOT NULL,
    nombreCompleto_in VARCHAR(50) NOT NULL,
    correo_in VARCHAR(300) NOT NULL,
    dirrecion_in VARCHAR(50) NOT NULL,
    pais_in VARCHAR(50) NOT NULL,
    estado_in VARCHAR(50) NOT NULL,
    cp_in VARCHAR(50) NOT NULL,
    nom_tar_in VARCHAR(50) NOT NULL,
    token VARCHAR(300) NOT NULL,
    useer_id INT(11),
    CONSTRAINT useer_id FOREIGN KEY (useer_id) REFERENCES users(id_us),
);

ALTER TABLE info_user
    ADD PRIMARY KEY (id_in);


ALTER TABLE info_user
    MODIFY id_in INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE pedidos(
    id_pe INT(11) NOT NULL,
    nombreCompleto_pe VARCHAR(50) NOT NULL,
    correo_pe VARCHAR(300) NOT NULL,
    dirrecion_pe VARCHAR(50) NOT NULL,
    calle_entre_pe VARCHAR(50) NOT NULL,
    entre_calle_pe VARCHAR(50) NOT NULL,
    colonia_pe VARCHAR(50) NOT NULL,
    no_int_pe VARCHAR(300) NOT NULL,
    no_ext_pe VARCHAR(300) NOT NULL,
    codigo_postal_pe INT(11),
    referencia_pe VARCHAR(300) NOT NULL,
    numero_telef_pe VARCHAR(300) NOT NULL,
    id_producto_pe INT(11),
    nombre_producto_pe VARCHAR(300) NOT NULL,
    no_pz_pe VARCHAR(300) NOT NULL,
    monto_pe VARCHAR(300) NOT NULL,
    usuario_pe_id INT(11),
    CONSTRAINT usuario_pe_id FOREIGN KEY (usuario_pe_id) REFERENCES users(id_us),
    CONSTRAINT id_producto_pe FOREIGN KEY (id_producto_pe) REFERENCES products(id_pr)
);

ALTER TABLE pedidos
    ADD PRIMARY KEY (id_pe);


ALTER TABLE pedidos
    MODIFY id_pe INT(11) NOT NULL AUTO_INCREMENT;

-- CREATE TABLE tokens(
--     id_token INT(11) NOT NULL,
--     token VARCHAR(50) NOT NULL,
--     user_id INT(11),
--     CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id_us),
-- );

-- ALTER TABLE tokens
--     ADD PRIMARY KEY (id_token);


-- ALTER TABLE tokens
--     MODIFY id_token INT(11) NOT NULL AUTO_INCREMENT;