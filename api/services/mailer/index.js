const fs = require('fs');
const Promise = require('bluebird');
const validate = require('validate.js');
const config = require('../../config');
const ejs = require('ejs');
const path = require('path');
const mailjet = require('node-mailjet').connect(config.mailJet.apiKey, config.mailJet.apiSecret, {
	url: 'api.mailjet.com',
	version: 'v3.1',
});

const ejsRenderFile = Promise.promisify(ejs.renderFile);

/**
 * Sends an email using the MailJet API
 * @param {Object} params object to validate existance of keys on.
 * @param {String} params.from senders email
 * @param {String} params.to recipients email
 * @param {String} params.subject email subject line
 * @param {String} params.template ejs template name
 */
async function sendEmail(params) {

	validate(params, {
		from: {presence: true},
		to: {presence: true},
		subject: {presence: true},
		template: {presence: true},
	})

  const emailParams = {
    'Messages':[{
      'From': {
        'Email': `${params.from}`,
        'Name': `${params.fromName ? params.fromName : ''}`
      },
      'To': [{
        'Email': `${params.to}`,
        'Name': `${params.toName ? params.toName : ''}`
      }],
      'Subject': `${params.subject}`,
      'TextPart': `${params.textPart ? params.textPart : ''}`,
      'HTMLPart': await ejsRenderFile(path.join(__dirname, `./templates/${params.template}`), params.data ? {data: params.data} : {}),
    }]
  };

	await mailjet.post('send').request(emailParams);
	return {success: true};
}

/**
 * prepare a contact form submission to email
 * @param {Object} contactFormParams params object
 * @param {String} contactFormParams.email submitters email
 * @param {String} contactFormParams.name submitters name
 * @param {String} contactFormParams.message submitters message
 */
async function contactFormEmail(contactFormParams) {
	if (!message) {
		throw new Error('Message required for contact form submission');
	}

	const emailParams = {
		to: 'sjw948@gmail.com',
		from: `stephen@stephenwright.co.uk`,
		subject: `A new contact form message from ${message.name}`,
		template: 'contact-form.ejs',
		data: message,
	}
	return await sendEmail(params);
}

module.exports = {
	contactFormEmail,
};
