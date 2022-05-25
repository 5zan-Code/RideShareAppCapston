const mongoose = require('mongoose')
const schema = mongoose.Schema

const rider_register_schema = new schema(
    {
        fname: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        lname: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },

        email: {
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
        rider_image:
            [
                {
                    
                    data: Buffer,
                    contentType: String
                },
            ],

        date: {
            type: Date,
            default: Date.now
        }


    }
)
module.exports = mongoose.model('rider_registeration', rider_register_schema)