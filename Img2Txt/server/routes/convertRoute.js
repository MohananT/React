var express = require('express');
var tesseract = require('tesseract.js');

// router handler
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Success');
});

router.post('/', function(req, res, next) {
  // const filename = req.body.filename;
  console.log('FileName from req', req.body.filename);
  var filename = './routes/pic.PNG'
  tesseract.recognize(filename)
  .progress(function  (p) { console.log('progress', p)  })
  .catch(err => {
    console.error(err);
    res.send('Error');
  })
  .then(function (result) {
    console.log(result.text);
    res.send('Success' + req.body.filename);
    process.exit(0);
  })

});

module.exports = router;
