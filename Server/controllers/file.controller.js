
const uploadFolder = process.env.PWD + '/uploads/';
const fs = require('fs');
 
exports.uploadFile = (req, res) => {
	res.send('File uploaded successfully! -> filename = ' + req.file.filename);
}
 
exports.listUrlFiles = (req, res) => {
	fs.readdir(uploadFolder, (err, files) => {
		for (let i = 0; i < files.length; ++i) {
			files[i] = process.env.PWD  + '/uploads/' + files[i];
			files[i] =  new Buffer(files[i]).toString('base64');

		}
		
		res.send(files);
	})
}
 
exports.downloadFile = (req, res) => {
	let filename = req.params.filename;
	res.download(uploadFolder + filename);  
}