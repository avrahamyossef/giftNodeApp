
const uploadFolder = "/var/www/html/uploads/";
const fs = require('fs');
var Images = require('../models/images.js');
//var currentPath = process.cwd();
//const uploadFolder = currentPath.replace("Server", "Client") + "/src/assets/uploads";

exports.uploadFile = (req, res) => {
    //res.send( req.files);
    Images.create({
        supplierId: req.body.SupplierId,
        supplierName: req.body.SupplierName,
        productId: req.body.ProductId,
        imagesSrc: req.files.map(function (e) { return e.filename })

    }, function (err, response) {
        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!response) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'Error on save images.'
            });
        }

        res.status(200).send({
            IsOk: true,
            Results: response,
        });
    });
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


exports.deleteFile = (req, res) => {

    Images.deleteOne({ "_id": req.body.imageId }).exec(function (err, response) {
        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!response) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'No product found.'
            });
        }

        res.status(200).send({
            IsOk: true,
            Results: deleteImageFromFolder(req,response),
        });
    });
}

deleteImageFromFolder = function (req, response)  {
    let filePath = uploadFolder + "/" + req.body.imageName;
    fs.access(filePath, error => {
        if (!error) {
            fs.unlink(filePath, function (error) {
                console.log(error);
                if(!error){
                    return response;
                }
            });
        } else {
            console.log(error);
        }
    });
}


