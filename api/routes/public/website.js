const asyncwrap = require('../../helpers/async-wrapper');
const mailer = require('../../services/mailer');
const validate = require('validate.js');

exports.contactForm = asyncwrap(async function contactForm(req, res) {
  validate(req.body, {
    name: {presence: true},
    email: {presence: true},
    message: {presence: true},
  })

  await mailer.contactForm(req.body)

  res.sendStatus(200);
})
