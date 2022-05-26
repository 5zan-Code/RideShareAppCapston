var path = require('path')
var multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname + '/uploads/'))
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    }
});

var upload = multer({ storage: storage });

module.exports = upload