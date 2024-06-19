const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
const gb = req.growthbook;
const key = process.env.clientKey;
const totalLengtth = key.length;
const lastFive = 5; 

let growthbookKey = "*".repeat(totalLengtth - lastFive) + key.substring(totalLengtth - lastFive);
let testingModeStatus = req.growthbook.isOn('TestingMode') ? "Active" : "Inactive";
let growthbookHost = process.env.apiHost;
let origin = process.env.origin;

    res.send(`
      <div style="font-family: Courier, monospace;">
        <ul>
          <li><h1>Host : ${growthbookHost} </h1></li>
          <li><h1>Key : ${growthbookKey} </h1></li>
          <li><h1>Flag TestingMode : ${testingModeStatus}</h1></li>
          <li><h1>Origin : ${origin} </h1></li>
        </ul>
      </div>
    `);
  
});

module.exports = router;
