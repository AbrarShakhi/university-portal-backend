import nodeMailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "node:url";

class EmailManager {
  #filename = undefined;
  #dirname = undefined;
  #transporter = undefined;

  constructor() {
    dotenv.config();

    this.#filename = fileURLToPath(import.meta.url);
    this.#dirname = path.dirname(this.#filename);

    this.#createTransporter();
    this.#configureHandlebars();
  }

  #createTransporter() {
    this.#transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  #configureHandlebars() {
    const handlebarsOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(this.#dirname, "../views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(this.#dirname, "../views"),
      extName: ".handlebars",
    };

    this.#transporter.use("compile", hbs(handlebarsOptions));
  }

  async sendEmail({ subject, send_to, reply_to, template, name, token }) {
    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: send_to,
      replyTo: reply_to,
      subject,
      template,
      context: { name, token },
    };

    try {
      return await this.#transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email sending error:", error);
      return undefined;
    }
  }
}

const emailManager = new EmailManager();
export default emailManager.sendEmail.bind(emailManager);
