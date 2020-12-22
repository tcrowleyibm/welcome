const express = require('express')
const app = express()
const port = process.env.WELCOME_PORT ? process.env.WELCOME_PORT : 3000
const axios = require('axios');

const msg = process.env.APP_MSG ? process.env.APP_MSG : "Hello! No custom message to present.";
app.get('/message', (req, res) => {
    res.status(200).send({ message: msg })
});

const catalogEndpoint = process.env.CATALOG_ENDPOINT ? process.env.CATALOG_ENDPOINT : "localhost:8001/tours";
const orderEndpoint = process.env.ORDER_ENDPOINT ? process.env.ORDER_ENDPOINT : "localhost:8002/orders";

console.log(`Catalog endpoint: ${catalogEndpoint}`);
console.log(`Order endpoint: ${orderEndpoint}`);

app.get('/catalog', async (req, res) => {
    try {
        const catDetails = await axios.get(catalogEndpoint)
        res.status(200).send({ message: catDetails.data })
    } catch (ex) {
        console.log(`Error retrieving catalog details: ${ex.message}`);
        res.status(400).send({ message: ex.message })
    }
});

app.get('/order', async (req, res) => {
    try {
        const orderDetails = await axios.get(orderEndpoint)
        res.status(200).send({ message: orderDetails.data })
    } catch (ex) {
        console.log(`Error retrieving order details: ${ex.message}`);
        res.status(400).send({ message: ex.message })
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});