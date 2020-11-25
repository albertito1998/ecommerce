const express = require('express');
const router = express.Router();
const pool = require('../database');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/formulario',urlencodedParser, async (req, res) => {
 console.log(req.body);
    const newComment = [
        req.body.name,
        req.body.email,
        req.body.phone,
      req.body.message
    ];  
    
    try{
    await pool.query("INSERT INTO contact set ?", [newComment]);
    res.redirect('/home');
} catch (err) {
    console.log(err);}
});
   
module.exports = router;