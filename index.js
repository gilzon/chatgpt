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
app.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        console.log(req.body);
        console.log(message,"message")
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
        });
        res.json({
            message: response.data.choices[0].text,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
