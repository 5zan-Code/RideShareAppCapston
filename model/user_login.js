const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user_login_schema = new schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  isVerified: {
    type: Boolean,
    isRequired: true,
    default : false
  }
});


module.exports = user_login_schema;