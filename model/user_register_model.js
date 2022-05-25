const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const schema = mongoose.Schema

const user_register_schema = new schema(
    {
        fname: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        lname: {
            type: String,
            required : true,
            min: 6,
            max: 255
        },

        email :{
            type: String,
            required: true,
            unique: true,
            min: 10,
            max: 255
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        carPlateNumber: {
            type: String,
            required: true,
            min: 10,
            max: 20
        },
        studentIDNumber: {
            type: String,
            required: true,
            min: 6,
            max: 255,
            unique: true
        },
        date:{
            type: Date,
            default: Date.now
        }


    }
)
module.exports =  mongoose.model('user_registeration', user_register_schema)