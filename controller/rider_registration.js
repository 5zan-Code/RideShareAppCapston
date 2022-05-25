const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
//const upload = multer({ dest: './public/uploads' })
const mdb_user_model = require("../model/rider_registration");
var fs = require("fs");
var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
var upload = multer({ storage: storage });

var response = { id: 0, msg: "", statusCode: 0 };

router.post(
  "/register_rider",
  upload.array("rider_image", 12),
  async (req, res) => {
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
        const hashPassword = await bcrypt.hashSync(req.body.password, salt);

        if (!existingUser) {
          let userData = mdb_user_model();
          userData.fname = req.body.fname;
          userData.lname = req.body.lname;
          userData.email = req.body.email;
          userData.password = hashPassword;

          const files = req.files;
          if (!files) {
            response.statusCode = 404;
            response.id = 0;
            response.msg = "Registration failed...!!!";
          } else {
            files.forEach((element) => {
              userData.rider_image.push({
                data: Buffer.from(
                  fs.readFileSync(element.path).toString("base64"),
                  "base64"
                ),
                contentType: "image/jpg",
              });
            });

            let newUser = await userData.save();

            response.statusCode = 200;
            response.id = newUser.id;
            response.msg = "Register Successfully";

            req.session.userId = response.id;
          }
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
  }
);

//Login
var response1 = {
  id: 0,
  msg: "",
  statusCode: 0,
  fname: "",
  lname: "",
  user_image: "",
  email: "",
};

router.post("/login_rider", async (req, res) => {
  try {
    let existingUser = await mdb_user_model.findOne({ email: req.body.email });
    if (existingUser) {
      if (bcrypt.compareSync(req.body.password, existingUser.password)) {
        response1.id = existingUser.id;
        response1.statusCode = 200;
        response1.msg = "Login succesful";
        (response1.email = existingUser.email),
          (response1.fname = existingUser.fname),
          (response1.lname = existingUser.lname),
          (response1.user_image = existingUser.user_image);
        req.session.userId = response1.id;
      } else {
        response1.statusCode = 201;
        response1.msg = "wrong password";
      }
    } else {
      response1.statusCode = 201;
      response1.msg = "Invalid email or password";
    }
  } catch (err) {
    console.log(err);
    response1.statusCode = 201;
    response1.msg = err;
  }

  res.json(response1);
});

// Update
var responseUpdate = { id: 0, msg: "", statusCode: 0 };
router.put(
  "/register_rider",
  upload.array("rider_image", 12),
  async (req, res) => {
    console.log()
    try {
      if (
        req.body.email &&
        req.body.fname &&
        req.body.lname &&
        req.body.maxNumberseats &&
        req.body.rider_image
      )
          {
            let userInfo = await mdb_user_model.findOne({
              email: req.body.email
            });console.log(userInfo)
              if(!userInfo){
                responseUpdate.statusCode = 404,
                responseUpdate.id = 0
                responseUpdate.msg = "User not found"
              }else {
                
                {
                  let updateExistingUser = await mdb_user_model.findByIdAndUpdate({
                    email: req.body.email
                  });
          
                  if (updateExistingUser == true) {
                    let userData = mdb_user_model();
                    userData.fname = req.body.fname;
                    userData.lname = req.body.lname;
                    userData.email = req.body.email;
                    userData.maxNumberseats = req.body.maxNumberseats;
                    const files = req.files;
                    if (
                      !files &&
                      req.body.fname &&
                      req.body.lname &&
                      req.body.email &&
                      req.body.maxNumberseats
                    ) {
                      responseUpdate.statusCode = 404;
                      responseUpdate.id = 0;
                      responseUpdate.msg = "Registration failed...!!!";
                    } else {
                      files.forEach((element) => {
                        userData.rider_image.push({
                          data: Buffer.from(
                            fs.readFileSync(element.path).toString("base64"),
                            "base64"
                          ),
                          contentType: "image/jpg",
                        });
                      });
          
                      let newUser = await userData.save();
          
                      responseUpdate.statusCode = 200;
                      responseUpdate.id = newUser.id;
                      responseUpdate.msg = "Data update Successfully";
          
                      req.session.userId = response.id;
                    }
                  } else {
                    responseUpdate.msg = "Data not updated!";
                  }
                }

              }
          }
      
    } catch (err) {
      responseUpdate.msg = err;
      console.log(err);
      responseUpdate.statusCode = 404;
    }
    res.json(responseUpdate);
  }
);

module.exports = router;
