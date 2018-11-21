
const uploadFolder = process.env.PWD.replace("Server","Client") + "/uploads";
const fs = require('fs');
 
exports.uploadFile = (req, res) => {
	res.send('File uploaded successfully! -> filename = ' + req.file.filename);
}
 
exports.listUrlFiles = (req, res) => {
	fs.readdir(uploadFolder, (err, files) => {
		for (let i = 0; i < files.length; ++i) {
			files[i] = "Https://regaloapp.xyz/api/file/" + files[i];
		}
		
		res.send(files);
	})
}
 
exports.downloadFile = (req, res) => {
	let filename = req.params.filename;
	res.download(uploadFolder + filename);  
}