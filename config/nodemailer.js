import nodemailer from "nodemailer";

const loginData={
 email:process.env.EMAIL,
 pass:process.env.EMAIL_PASS
}

export const transporter = nodemailer.createTransport({
  host: 'mail.tminox.com.ro',
  port: 465,
  secure: true,
  auth: {
    user:loginData.email,
    pass:loginData.pass,
  },
});

export const mailOptions = {
  from: loginData.email,
  to: loginData.email,
};

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

