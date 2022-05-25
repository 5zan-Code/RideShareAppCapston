const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const mdb_user_model = require("../model/user_register_model");
var fs = require("fs");
var path = require("path");
var upload = require("./file_upload");
const user_register_model = require("../model/user_register_model");
const userLogin = require("../model/user_login");

var response = { id: 0, msg: "", statusCode: 0 };

router.post("/register_user", upload.single("user_image"), async (req, res) => {
  try {
    if (
      req.body.email &&
      req.body.fname &&
      req.body.lname &&
      req.body.password
    ) {
      let existingUser = await mdb_user_model.findOne({
        email: req.body.email,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      if (!existingUser) {
        let userData = mdb_user_model();
        userData.fname = req.body.fname;
        userData.lname = req.body.lname;
        userData.email = req.body.email;
        userData.password = hashPassword;

        let newUser = await userData.save();

        response.id = newUser.id;
        response.msg = "Register Successfully";
        response.statusCode = 200;
        req.session.userId = response.id;
        console.log(newUser);
      } else {
        response.msg = "User already exists";
      }
    }
  } catch (err) {
    response.msg = err;
    console.log(err);
    response.statusCode = 404;
  }
  res.json(response);
});

router.get("/register_user", async (req, res) => {
  if (req.session.userId) {
    mdb_user_model.find(
      {
        id: req.session.userId,
      },
      (err, items) => {
        if (err) {
          console.log(err);
          res.status(500).send("An error occurred", err);
        } else {
          res.send(items);
        }
      }
    );
  } else {
    response.msg = req.session.userId;
    response.statusCode = 201;
  }
  res.json(response);
});

//Login

router.post("/login", async (req, res) => {
  let existingEmail = await mdb_user_model.findOne({ email: req.body.email });
  if (!existingEmail) {
    response.id = req.body.email;
    response.msg = "Email doen't exist";
    response.statusCode = 404;
    
  } else {
    response.id = req.body.email;
    response.msg = "verification Successfully";
    response.statusCode = 200;
  }
});

module.exports = router;
