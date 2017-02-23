'use strict';

const express = require('express');
const router = express.Router();

const API = require('../api/dice.js');
const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com'

router.get('/', (req, res, next) => res.send('API Works'));

router.get('/posts', (req, res) => {
    // get post from mock API
    // replace this with api to connect to mongo for example

    axios.get(`${API}/posts`)
        .then(posts => res.status(200).json(posts.data))
        .catch(error => res.status(500).send(error));
});

router.post('/roll', (req, res) => {
    console.log(req.body, 'req hit in routes')
    let object = {
        data: "blah"
    }
    let die = API.evaluate("3d6");
    res.status(200).json(die)
})

module.exports = router;