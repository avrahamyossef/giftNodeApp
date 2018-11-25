const multer = require('multer');
 
// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 	  cb(null, "/var/www/html/uploads/")
// 	},
// 	filename: (req, file, cb) => {
// 	  cb(null, file.originalname)
// 	}
// });

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/var/www/html/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
 
var upload = multer({storage: storage});
 
module.exports = upload;