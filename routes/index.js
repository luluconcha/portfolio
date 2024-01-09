const express = require('express');
const router = express.Router();
const data = require("../cv.js");
require("dotenv").config({path : "../.env"})

router.get("/", async (req, res) => {
    try {
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send("education could not be fetched, " + err.message)
    }
})
// gotta do a nodemailer thing
router.post("/", async (req, res) => {
    const {email, text, title} = req.body
    try {
        const response = await sendMail(email, text, title)
        res.status(201).send({data: response})
    } catch(err) {
        res.status(500).send("email could not be sent")
    }
})

async function sendMail(email_address, text, title) {
    try {
       const transporter = nodemailer.createTransport({
          host: '127.0.0.1',
          port: 1025,
          secure: false,
          auth: {
            user: `${process.env.MASTER_EMAIL}`,
            pass: `${process.env.PROTONMAIL_SMTP_PASS}`
          },
          tls: {
            rejectUnauthorized: false
          }
        })
        // remove email_address and array brackets from "to:" to stop actually sending
      const message = {
        from: `${process.env.MASTER_EMAIL}`,
        to: [`${process.env.MASTER_EMAIL}`, `${email_address}`],
        subject: `${title}`,
        text: `${text}`,
      }
      const info = await transporter.sendMail(message)
    //   const response = `Email sent: ${info.response}`
    //   console.log(response)
      return info.response
  
    } catch (err) {
      return err;
    }
  
  
  }
module.exports = router;