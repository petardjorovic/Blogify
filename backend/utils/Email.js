const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

class Email {
    constructor(user, url) {
        this.to = user.email;
        this.from = 'Social Network <devbackapp25@gmail.com';
        this.firstName = user.firstName;
        this.url = url;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: process.env.USER_EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASS,
                },
            });
        } else {
            return nodemailer.createTransport({
                host: process.env.MAILTRAP_HOST,
                port: process.env.MAILTRAP_PORT,
                secure: false, // true for port 465, false for other ports,
                auth: {
                    user: process.env.MAILTRAP_USERNAME,
                    pass: process.env.MAILTRAP_PASSWORD,
                },
            });
            // return nodemailer.createTransport({
            //     host: process.env.EMAIL_HOST,
            //     port: process.env.EMAIL_PORT,
            //     secure: false, // true for port 465, false for other ports
            //     auth: {
            //         user: process.env.USER_EMAIL_ADDRESS,
            //         pass: process.env.EMAIL_PASS,
            //     },
            // });
        }
    }

    async sendWelcome() {
        await this.send('Welcome to Our Social Network', 'welcome');
    }

    async send(subject, template) {
        const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
            subject: subject,
            firstName: this.firstName,
            url: this.url,
            email: this.to,
        });
        const mailOptions = {
            from: this.from, // sender address
            to: this.to, // list of receivers
            subject, // subject line
            html, // html body
            text: convert(html), // plain text body
        };

        await this.newTransport().sendMail(mailOptions);
    }
}

module.exports = Email;
