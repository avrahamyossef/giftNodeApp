
//var currentPath = process.cwd();
//const uploadFolder = currentPath.replace("Server", "Client") + "/uploads";
const uploadFolder = '/var/www/html/uploads/';
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadFolder);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname.split(".")[0] + "-" + Date.now() + "." + file.originalname.split(".")[1]);
  }
});

var upload = multer({ storage: storage });

module.exports = upload;