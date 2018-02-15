const express = require('express');
const website = require('./website');

const router = express.Router();

router.post('/website/contact-form', website.contactForm)

module.exports = router;
