const { SessionsClient } = require('dialogflow');
const sessionClient = new SessionsClient({
  keyFilename: 'path/to/your/dialogflow-key.json', // Replace with your Dialogflow key file path
});

const sessionPath = sessionClient.sessionPath('your_project_id', 'unique_session_id'); // Replace with your Dialogflow project ID and a unique session ID

const sendTextMessage = async (text) => {
  const [response] = await sessionClient.detectIntent({
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'en-US',
      },
    },
  });

  return response.queryResult.fulfillmentText;
};

const handleIncomingMessage = async (body) => {
  const userMessage = body.Body;

  const aiResponse = await sendTextMessage(userMessage);

  const twiml = new MessagingResponse();
  twiml.message(aiResponse);

  return twiml.toString();
};

const server = require('http').createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    const twimlResponse = await handleIncomingMessage(JSON.parse(body));

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twimlResponse);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
