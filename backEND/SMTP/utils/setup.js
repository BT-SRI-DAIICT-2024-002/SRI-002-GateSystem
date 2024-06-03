const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


// Template website link
// https://moosend.com/templates/welcome/



const mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: '587',
    // secure:'true', 
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});



mailTransporter.verify((error, success) => {
    if (error) console.log(error);
    console.log("Server is ready to take our messages");
});



module.exports = mailTransporter;