const nodemailer = require("nodemailer");

async function enviarEmail(emailTitle, emailBody, attachments) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: "pedro.marques@beecloud.com",
    to: "pedro.marques@beecloud.com",
    subject: emailTitle,
    html: emailBody,
    attachments: attachments
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info.response);
  } catch (err) {
    console.error("Erro ao enviar email:", err);
  }
}

// Exporte a função corretamente usando module.exports para CommonJS
module.exports = enviarEmail;
