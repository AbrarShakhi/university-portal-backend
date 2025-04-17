import nodeMailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async ({
  subject,
  send_to,
  reply_to,
  template,
  name,
  token,
}) => {
  const transporter = nodeMailer.createTransport({
    // personal gmail
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL, // email
      pass: process.env.EMAIL_PASS, // password
    },
  });

  const handlebarsOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "../views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    template: template,
    context: {
      name: name,
      token: token,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    return undefined;
  }
};

export default sendEmail;
