const Mailgun = require('mailgun-js');
const template = require('../config/template');
const keys = require('../config/keys');

const { key, domain, sender } = keys.mailgun;

class MailgunService {
  constructor() {
    if (!key || !domain || !sender) {
      throw new Error('Missing mailgun keys');
    }
    this.mailgun = new Mailgun({ apiKey: key, domain: domain });
  }

  sendEmail = async (email, type, host, data) => {
    try {
      const message = this.prepareTemplate(type, host, data);

      if (!message) {
        throw new Error('Invalid email type provided');
      }

      const config = {
        from: `MERN Store! <${sender}>`,
        to: email,
        subject: message.subject,
        text: message.text,
      };

      await this.mailgun.messages().send(config);
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Failed to send email. Please try again later.');
    }
  };

  prepareTemplate(type, host, data) {
    switch (type) {
      case 'reset':
        return template.resetEmail(host, data);
      case 'reset-confirmation':
        return template.confirmResetPasswordEmail();
      case 'signup':
        return template.signupEmail(data);
      case 'merchant-signup':
        return template.merchantSignup(host, data);
      case 'merchant-welcome':
        return template.merchantWelcome(data);
      case 'newsletter-subscription':
        return template.newsletterSubscriptionEmail();
      case 'contact':
        return template.contactEmail();
      case 'merchant-application':
        return template.merchantApplicationEmail();
      case 'merchant-deactivate-account':
        return template.merchantDeactivateAccount();
      case 'order-confirmation':
        return template.orderConfirmationEmail(data);
      default:
        return null; // Return null for invalid types
    }
  }
}

// Create an instance of MailgunService
const mailgunService = new MailgunService();

// Export the sendEmail method
exports.sendEmail = mailgunService.sendEmail.bind(mailgunService);
