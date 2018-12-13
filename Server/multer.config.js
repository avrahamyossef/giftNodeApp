
//var currentPath = process.cwd();
//const uploadFolder = currentPath.replace("Server", "Client") + "/src/assets/uploads";
const uploadFolder = '/var/www/html/uploads/';
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadFolder);
  },
  filename: function (req, file, callback) {
    var splitName = file.originalname.split(".");
    callback(null, splitName[0] + "_" + Date.now() + "." + splitName[splitName.length - 1]);
  }
});

var upload = multer({ storage: storage });

module.exports = upload;