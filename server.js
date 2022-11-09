const express = require('express');
const axios = require('axios');
require('dotenv').config()

// variables for you to change
const axiosOptions = {};
const url = process.env.URL;
const type = "";
const body = require('./newRecord.js')

const app = express();

app.get('/', (req, res) => {
    let message = `HOME! current type is ${type}. Try one of these: /getOne /getMany /post /put /delete`;
    res.send(message)
});

app.get('/getOne/:id', async (req, res) => {
    let record = await axios.get(`${url}/${type}/${req.id}`, axiosOptions)
    res.send(JSON.stringify(record.data));
});

app.get('/getMulti', async (req, res) => {
    let record = await axios.get(`${url}/${type}`, axiosOptions)
    res.send(JSON.stringify(record.data));
});
    
app.get('/post', async (req, res) => {
  let response = await axios.post(`${url}/${type}`, body, axiosOptions)
  res.send(JSON.stringify(response.data));
})

app.get('/edit/:id', async (req, res) => {
  let response = await axios.put(`${url}/${type}/${req.id}`, body, axiosOptions)
  res.send(JSON.stringify(response.data));
});

app.get('/delete/:id', async (req, res) => {
  let response = await axios.delete(`${url}/${type}/${req.id}`, axiosOptions)
  res.send(JSON.stringify(response.data));
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`🎻 You are listening to port ${process.env.PORT || 3000} 🎻`);
});