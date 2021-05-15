const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51IrKTaKakUNLk7QM9PVGr2AhY6MBd2Y3DyC8y19X1cekSlibzceH92qup2RQ29mdN3I5rxJiWJmgzEr0JecaYrgQ00s757rdW3');


// for API setup


// App config
const app = express();

// middlewares
// security shit
app.use(cors({ origin: true }));
//send and get data in json format
app.use(express.json())
// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post('/payments/create', async (request, response) => {
    // this is amount in subunits
    const total = request.query.total;

    console.log("Payment request received BOOM! >>>>>>>", total);
    // we created the payment in here
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // we get the total
        currency: "usd" // the currency is usd
    });
    // 201 okay everything worked good
    response.status(201).send({
        // this is the code that we want to make the payment
        clientSecret: paymentIntent.client_secret,

    })
})
// Listen command

exports.api = functions.https.onRequest(app);


//example endpoint
//http://localhost:5001/rookas-amzon-app/us-central1/api


