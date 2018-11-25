
const uploadFolder = "/var/www/html/uploads/";
const fs = require('fs');

exports.uploadFile = (req, res) => {
	res.send('File uploaded successfully! -> filename = ' + req.file.filename);
	// if (err) {
	// 	res.status(404).json({
	// 		IsOk: false,
	// 		errorMessage: 'Error uploading file.',
	// 		error: err
	// 	});
	// }
	// res.status(200).json({
	// 	IsOk: true,
	// 	Results: "File is uploaded: " + req.file.filename
	// });
}

exports.listUrlFiles = (req, res) => {
	fs.readdir(uploadFolder, (err, files) => {
		for (let i = 0; i < files.length; ++i) {
			files[i] = files[i];
		}

		res.send(files);
	})
}

exports.downloadFile = (req, res) => {
	let filename = req.params.filename;
	res.download(uploadFolder + filename);
}