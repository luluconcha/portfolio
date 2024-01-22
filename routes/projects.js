const express = require('express');
const router = express.Router();
const data = require("../projectsfile.js");

router.get("/", async (req, res) => {
    try {
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send("project images could not be fetched, " + err.message)
    }
})


module.exports = router;