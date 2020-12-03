const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.home);

/* GET detail page */
router.get('/detail', indexController.detail);

/* post comprar */
router.get('/callback', indexController.callback)

/* post comprar */
router.post('/notifications', indexController.notifications)

/* post comprar */
router.post('/buy', indexController.buy)

module.exports = router;
