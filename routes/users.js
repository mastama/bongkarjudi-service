const express = require('express');
const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to bongkar judi"
  })
})

module.exports = router;
