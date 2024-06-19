const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Client API Clock: WORKING`);
});

module.exports = router;
