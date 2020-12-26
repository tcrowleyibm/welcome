const express = require('express')
const app = express()
const port = process.env.WELCOME_PORT ? process.env.WELCOME_PORT : 3000
const axios = require('axios');

const msg = process.env.APP_MSG ? process.env.APP_MSG : "Hello! No custom message to present.";
app.get('/message', (req, res) => {
    res.status(200).send({ message: msg })
});

const catalogServiceURL = 'http://' + (process.env.CHARTERS_URL ? process.env.CHARTERS_URL : "localhost:8001/tours");
const orderServiceURL = 'http://' + (process.env.ORDERS_URL ? process.env.ORDERS_URL : "localhost:8002/orders");

console.log(`Catalog service: ${catalogServiceURL}`);
console.log(`Orders service: ${orderServiceURL}`);

app.get('/catalog', async (req, res) => {
    try {
        const catDetails = await axios.get(catalogServiceURL)
        res.status(200).send({ message: catDetails.data })
    } catch (ex) {
        console.log(`Error retrieving catalog details: ${ex.message}`);
        res.status(400).send({ message: ex.message })
    }
});

app.get('/order', async (req, res) => {
    try {
        const orderDetails = await axios.get(orderServiceURL)
        res.status(200).send({ message: orderDetails.data })
    } catch (ex) {
        console.log(`Error retrieving order details: ${ex.message}`);
        res.status(400).send({ message: ex.message })
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});