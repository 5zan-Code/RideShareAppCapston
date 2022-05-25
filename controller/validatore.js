const nodemailer = require('nodemailer');
const {user_register} = require('./user_registration')
const express = require("express");
const router = express.Router();


var response = { id: 0, msg: "", statusCode: 0 };
router.post("/validator", async (req, res) => {
   

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rideshareteam11@gmail.com',
            pass: 'lbzqyqqhuafiwfkc'
        }
    });
    
    var mailOptions = {
        from: 'rideshareteam11@gmail.com',
        to: req.body.email,
        subject: 'Your verification code...!!',
        text: `Your verification code is ${req.body.code}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            response.id = req.body.email
            response.msg = "verification Failed";
            response.statusCode = 404;
            console.log(error);
        } else {
            response.id = req.body.email
            response.msg = "verification Successfully";
            response.statusCode = 200;
           
            console.log('Email sent: ' + info.response);
            res.json(response);
        }
       
    });
   
});

module.exports = router;