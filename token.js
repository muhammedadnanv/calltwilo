const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const twilioNumber = 'your_twilio_phone_number';
const recipientNumber = 'recipient_phone_number';

const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml', // TwiML Bin URL or your own TwiML URL
    to: recipientNumber,
    from: twilioNumber,
  })
  .then((call) => console.log(`Call SID: ${call.sid}`))
  .catch((error) => console.error(error));
