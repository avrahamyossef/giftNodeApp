

var hbs = require('nodemailer-express-handlebars');
var nodemailer = require('nodemailer');
var path = require('path');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'avrahamyossef3@gmail.com',
        pass: 'Ay748596'
    }
};

var mailer = nodemailer.createTransport(smtpConfig);
//var mailer = nodemailer.createTransport('smtps://avrahamyossef3%40gmail.com:Ay748596@smtp.gmail.com');

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: 'views/partials',
        layoutsDir: 'views/partials',
        defaultLayout: 'html.hbs',
    },
    viewPath: 'views/partials',
    extName: '.hbs',
};

mailer.use('compile', hbs(handlebarOptions));

exports.sendEmail = function (req, res) {

    mailer.sendMail(
        {
            from: '"BlackSummer" <blacksummerinfo@gmail.com>',
            to: req.body.email,
            subject: 'מימוש קוד קופון | BlackSummer',
            template: 'html',
            partialsDir: 'views/partials',
            context: {
                userName: req.body.userName,
                eventName: req.body.eventName,
                eventLogo: req.body.eventLogo,
                eventDate: req.body.eventDate
            }
        }
        , (error, info) => {
            if (error) {
                return res.status(500).send({
                    IsOk: false,
                    errorMessage: 'Error on the server. error: ' + error
                });
            }
            return res.status(200).json({
                IsOk: true,
                //Results: res.json(info)
            });
        });

}
