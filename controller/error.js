const express = require('express')
const route = express()

route.get('/', async (req, res) => {
    // res.send('<html> <head> <title>Hello World</title> <meta name="description" content="Trailhead Link" /> <meta name="title" property="og:title" content="Trailhead" /> <meta property="og:type" content="Website" /> <meta name="image" property="og:image" content="https://live.staticflickr.com/65535/51936695175_5b473c1c7b_z.jpg"  /> <meta name="description" property="og:description" content="Trailhead Link" /> <meta name="author" content="Yash Anghan" /> </head> <body> <a a href = "#" class="cta" > <span>Click me</span> <svg width="13px" height="10px" viewBox="0 0 13 10"> <path d="M1,5 L11,5"></path>  <polyline points="8 1 12 5 8 9"></polyline> </svg> </a> </body> </html >')
    // res.sendFile(__dirname + "/index.html");
    res.render("sfdc")
})



module.exports = route