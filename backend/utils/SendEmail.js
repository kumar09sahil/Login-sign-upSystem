const nodemailer = require('nodemailer')

const sendEmail = async (option) =>{
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: "odinsonthor546@gmail.com",
          pass: "skonsusttgwylgbn"
        }
      });

      const emailoptions = {
        from: 'odinsonthor546@gmail.com', 
        to: option.email,
        subject: option.subject, 
        text: option.content
      }

    await transporter.sendMail(emailoptions)
}

module.exports = sendEmail