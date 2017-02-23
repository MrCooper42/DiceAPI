'use strict';

const express = require('express');
const router = express.Router();

const API = require('../api/dice.js');

router.get('/', (req, res, next) => res.send('API Works'));

router.post('/roll', (req, res) => {
    // check validity here for quicker response
    let die = new Promise((resolve, reject) => {
        resolve(API.evaluate(req.body.submitRoll));
    });
    die.then((dieResolve) => res.status(200).json(dieResolve))
        .catch((err) => res.status(400).json(err));
})

router.post('/probability', (req, res) => {
    console.log(req.body, 'wfefe')
    console.log(req.body.submitRoll, "234234")
    let prob = new Promise((resolve, reject) => {
        resolve(API.probability(req.body.submitRoll));
    });
    prob.then((dieResolve) => res.status(200).json(dieResolve))
        .catch((err) => res.status(400).json(err));
})

module.exports = router;