const express = require('express');
const router = express.Router();
var bodyparser = require('body-parser');
const nodemailer = require("nodemailer");;
const pool = require('../database');
const { request } = require('express');
const { isLoggedIn, userID } = require('../lib/auth');
var urlencodedParser = bodyparser.urlencoded({ extended: false });

router.get('/', (req, res) => {
    res.render('layouts/welcome');
});
router.get('/enterprise', (req, res) => {
    res.render('layouts/enterprise');
});
router.get('/product',  async (req, res) => {
    const product = await pool.query('SELECT * FROM products');
    console.log(product);
    res.render('layouts/product', {product});

});

router.get('/productInfo/:idproduct', async (req, res) => {
    const { idproduct } = req.params;
    const productInfo = await pool.query('SELECT * FROM products WHERE idproduct = ?', idproduct);
    console.log(productInfo);
    res.render('layouts/productimage', {productInfo});
});
router.get('/formvalidation', async (req, res) => {
    const cartshop = await pool.query('SELECT * FROM shopping_cart WHERE id = ?', [req.user.id]);
    const products = await pool.query('SELECT * FROM products');
    console.log(cartshop);
    console.log(products);
    res.render('layouts/form-validation', {cartshop:cartshop, products:products});
});


router.get('/home', (req, res) => {
    res.render('layouts/welcome');
});


// DELETE ITEM SHOPPING CART

router.get('/delete/:productId', async function(req, res) {
const { idproduct } = req.params;
await pool.query('DELETE FROM shopping_cart WHERE id = ? AND idproduct = ?', [req.user.id, idproduct]);
req.flash('success','ITEM DELETE SUCESSFULLY');
res.redirect('/formvalidation');
});

// ADD ITEM SHOPPING CART

router.post('/add/:idproduct', isLoggedIn, async function(req, res) {
    const {idproduct} = req.params;
    console.log(req.body);
    
    const { cantidad, talla} = req.body;
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

createdAt = [year, month, day].join('-');
    const id= req.user.id;
    let newItem = {
        id,
        idproduct,
        createdAt,
        cantidad,
        talla
      };
    await pool.query('INSERT IGNORE INTO shopping_cart SET ?' , newItem);
    req.flash('success','ITEM ADDED SUCESSFULLY');
    res.redirect('/formvalidation');
    });

// EDIT ITEM SHOPPING CART

router.post('/edit', urlencodedParser,  function(req, res) {
    
    console.log("triggered");
   // const { idproduct} = req.params;
    // const { cantidad}=req.body;
  console.log(req.body);
  /*  await pool.query('UPDATE shopping_cart cantidad = ? WHERE id_customer = ? AND idproduct =?', [cantidad, req.user.id, idproduct]);
    req.flash('success','ITEM EDITED SUCESSFULLY'); */
    res.redirect('/formvalidation'); 
    });



router.post('/formulario', function (req, res){  
   
  contactForm.name = req.body.name;
    contactForm.phone  = req.body.phone;
    contactForm.email  = req.body.email;
    contactForm.message  = req.body.message;  
console.log(contactForm);
  
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
         name: 'Mitchel Armstrong',
        host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mitchel.armstrong97@ethereal.email',
        pass: 'jVx3Zy6gPX9TjNrzMq'
    },
    tls:{
        rejectUnauthorized:false
    } 
   

    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "albegoco@gmail.com", //contactForm.name, // sender address
      to: "albegoco@gmail.com", // list of receivers
      subject: "NEW MESSAGE ON YOUR WEBSITE", // Subject line
      html: `<b> FROM: ${contactForm.name } </b><b> EMAIL: ${contactForm.email } </b><b> PHONE: ${contactForm.phone } </b><b> MESSAGE: ${contactForm.message } </b>`
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.send('Perfect');
  }
  
  const SendEmail = main().catch(err => {
      res.status(500).send(err.message)
    });
});




module.exports = router