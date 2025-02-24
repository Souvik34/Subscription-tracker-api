/* eslint-disable no-unused-vars */
import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get('/', (req, res)=>{
    res.send('Welcome to Truebill, a Subscription Tracker API');
});

app.listen(PORT, ()=>{
    console.log(`Truebill running on http://localhost:${PORT}`)
})

export default app;