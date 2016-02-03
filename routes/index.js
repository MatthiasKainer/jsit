var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/ts', function(req, res) {
    var tss = require('typescript-simple');
    console.log(req.body.src);
    res.send(tss(req.body.src));
});

module.exports = router;
