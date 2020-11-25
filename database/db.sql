CREATE DATABASE ecommerce;

USE ecommerce;

-- TABLE  PRODUCTS

CREATE TABLE products
 (
  idproduct INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE ,
  name_product VARCHAR(45) NOT NULL,
  price FLOAT NOT NULL,
  description_product  BLOB NOT NULL,
  photo VARCHAR(45) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (idproduct);

INSERT INTO products (name_product, price, description_product,  photo ) 
  VALUES ('ShiSha 1', '30.45', 'Lorem ipsum............', '/products/product1.jpg');

  INSERT INTO products (name_product, price, description_product,  photo ) 
  VALUES ('ShiSha 2', '20.45', 'Lorem ipsum............', '/products/product2.jpg');

  INSERT INTO products (name_product, price, description_product,  photo ) 
  VALUES ('ShiSha 3', '20.45', 'Lorem ipsum............', '/products/product3.jpg');

DESCRIBE products;

SELECT * FROM products;



-- TABLE USER
-- all password wil be encrypted using SHA1

CREATE TABLE users
 (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(60) NOT NULL,
 photo VARCHAR(69),
 phone INT,
 credit_card INT,
 CVV INT,
 Caducidad_tarjeta VARCHAR(5)
);

SELECT * FROM users;
DESCRIBE users;


-- DELETE

DROP table links;

-- TABLE SHOPPING CART

CREATE TABLE shopping_cart
 (
id INT NOT NULL,
idproduct INT NOT NULL,
createdAt DATE NOT NULL,
cantidad INT NOT NULL,
talla VARCHAR (45),
color VARCHAR (45),

  FOREIGN KEY (id)  REFERENCES users(id),

    FOREIGN KEY (idproduct) REFERENCES products(idproduct)
);

-- TABLE CONTACT

CREATE TABLE contact
 (
id_contact INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
name VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL,
phone VARCHAR(45) NOT NULL,
message  VARCHAR(255) NOT NULL
);


-- TABLE INFORMATION VARIOUS

CREATE TABLE information
 (
idinfo INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
name VARCHAR(45) NOT NULL,
information MEDIUMBLOB,
photo VARCHAR(45)
);
