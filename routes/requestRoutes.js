const express = require("express");
const router = express.Router();

const {requestRates}= require('../controllers/requestController');

router.get('/',requestRates);

module.exports = router;