const multer = require('multer');
const path = require('path').dirname(require.main.filename)
// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 	  cb(null, "/var/www/html/uploads/")
// 	},
// 	filename: (req, file, cb) => {
// 	  cb(null, file.originalname)
// 	}
// });

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.replace("Server", "Client") + "/uploads"); //'/var/www/html/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname.split(".")[0] + "-" + Date.now() + "." + file.originalname.split(".")[1]);
  }
});

var upload = multer({ storage: storage });

module.exports = upload;