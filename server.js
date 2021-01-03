const express = require('express')
const app = express()
const port = process.env.WELCOME_PORT ? process.env.WELCOME_PORT : 3000
const axios = require('axios');

const msg = process.env.APP_MSG ? process.env.APP_MSG : "Hello! No custom message to present.";
app.get('/message', (req, res) => {
    res.status(200).send({ message: msg })
});

const chartersServiceURL = 'http://' + (process.env.CHARTERS_URL ? process.env.CHARTERS_URL : "localhost:8001/tours");
const reservationsServiceURL = 'http://' + (process.env.RESERVATIONS_URL ? process.env.RESERVATIONS_URL : "localhost:8002/reservations");

console.log(`Charters service: ${chartersServiceURL}`);
console.log(`Reservations service: ${reservationsServiceURL}`);

app.get('/charters', async (req, res) => {
    try {
        const catDetails = await axios.get(chartersServiceURL)
        res.status(200).send({ message: catDetails.data })
    } catch (ex) {
        console.log(`Error retrieving charter-related details: ${ex.message}`);
        res.status(400).send({ message: ex.message })
    }
});

app.get('/reservation', async (req, res) => {
    try {
        const reservationDetails = await axios.get(reservationsServiceURL)
        res.status(200).send({ message: reservationDetails.data })
    } catch (ex) {
        console.log(`Error retrieving reservation details: ${ex.message}`);
        res.status(400).send({ message: ex.message })
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});