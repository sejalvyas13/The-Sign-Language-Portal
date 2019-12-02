const express = require('express');
const router = express.Router();
const data = require('../data');
const signData = data.signs;

router.post('/fromText', async (req, res) => {
    try {
        const text = req.body.text;
        console.log(text);
        const signObj = await signData.getSignByText(text.toLowerCase());
        console.log(signObj);
        //const sign = await signData.getSignByText();
        res.json(signObj);
        
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;
