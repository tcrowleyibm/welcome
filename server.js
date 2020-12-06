const express = require('express')
const app = express()
const port = 3000

const msg = process.env.APP_MSG ? process.env.APP_MSG : "Hello! No custom message to present."

app.get('/message', (req, res) => {
    res.status(200).send({ message: msg })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});