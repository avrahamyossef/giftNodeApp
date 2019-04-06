
var sender = 'smtps://blacksummerinfo@gmail.com'   // The emailto use in sending the email
//(Change the @ symbol to %40 or do a url encoding )
var password = 'blacksummer2019'  // password of the email to use

var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;

var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'blacksummerinfo@gmail.com',
        pass: 'blacksummer2019'
    }
});


// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
var sendEventInfo = transporter.templateSender(
    new EmailTemplate('../templates'), {
        from: 'hello@blackSummer.xyz',
    });

exports.sendEmail = function (req, res) {

    // transporter.template
    sendEventInfo({
        to: req.body.email,
        subject: 'מימוש קוד קופון הנחה - BlackSummer'
    }, {
            userName: req.body.userName,
            eventName: req.body.eventName,
            eventLogo: req.body.eventLogo,
            eventDate: req.body.eventDate

        }, function (err, info) {
            if (err) {
                return res.status(500).send({
                    IsOk: false,
                    errorMessage: 'Error on the server : ' + err
                });
            } else {
                return res.status(200).send({
                    IsOk: true,
                    Results: JSON.stringify(info)
                });
            }
        });
}
