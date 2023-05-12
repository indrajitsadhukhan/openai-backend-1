const express = require('express')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')

// This apis are created following https://platform.openai.com/docs/api-reference/edits/create?lang=node.js
OPENAI_API_KEY = "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"

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send("Application is running.")
})


app.post('/completion', async (req, res) => {
  try {
    // Prompt = Content + Instruction
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 300, 
      top_p: 1, 
      frequency_penalty: 0.5,
      presence_penalty: 0, 
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    // console.error(error)
    console.log("Error 2")
    res.status(500).send(error || 'Something went wrong');
  }
})


port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
