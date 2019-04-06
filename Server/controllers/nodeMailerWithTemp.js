

var MailConfig = require('../ config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;




exports.sendEmail = function (req, res) {

    MailConfig.ViewOption(gmailTransport, hbs);
    let HelperOptions = {
        from: sender,
        to: req.body.email,
        subject: 'מימוש קוד קופון | BlackSummer',
        template: 'html',
        context: {
            userName: req.body.userName,
            eventName: req.body.eventName,
            eventLogo: req.body.eventLogo,
            eventDate: req.body.eventDate
        }
    };
    gmailTransport.sendMail(HelperOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json(error);
        }
        console.log("email is send");
        console.log(info);
        res.json(info)
    });

}
