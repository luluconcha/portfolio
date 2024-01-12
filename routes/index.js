const express = require('express');
const router = express.Router();
const data = require("../cv.js");
require('dotenv').config()
const nodemailer = require('nodemailer') 

router.get("/", async (req, res) => {
    try {
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send("education could not be fetched, " + err.message)
    }
})
router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        res.status(201).send({data: data[id]})
    } catch (err) {
        res.status(500).send("education could not be fetched, " + err.message)
    }
})
// gotta do a nodemailer thing
router.post("/", async (req, res) => {
    const {email, title, content} = req.body
    try {
        sendMail(email, title, content)
          res.status(201).send("email was sent")  
    } catch(err) {
        res.status(500).send("email could definitely not be sent")
    }
})

async function sendMail(email, title, content) {

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
       
      const message = {
        from: `${process.env.MASTER_EMAIL}`,
        to: `${process.env.OTHER_EMAIL}`,
        subject: `${title}` || 'contact from portfolio',
        text: `${content} from ${email}`,
        html: `<p>${content}</p><br /><br /> from ${email}`
      }

      const info = await transporter.sendMail(message)
      const response = `Email sent: ${info.response}`

      return response
  
    } catch (err) {
      return err;
    }
  
  
  }
module.exports = router;