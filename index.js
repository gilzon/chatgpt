const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
    organization: "org-5KOuQXGPq77RSnhtYu2E4OU0",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors()); // enable CORS

const port = 3080;

// Create POST endpoint
app.post('/', async (req, res) => {
  try {
    const {message,currentModel}= req.body;
    const response = await openai.complete({
      engine: `${currentModel}`,//'text-davinci-002',
      prompt: req.body.prompt,
      maxTokens: 5,
    });
    res.json({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while processing your request',
    });
  }
});

// Create GET endpoint to list available models
app.get('/models', async (req, res) => {
  try {
    const response = await openai.listEngines();
    res.json({
      models: response.data.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while processing your request',
    });
  }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
