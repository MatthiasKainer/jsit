var express = require('express');
var router = express.Router();
var ts = require("typescript");

var target = function(req) {
    return !req.target || req.target === "es5" ? ts.ScriptTarget.ES5 : ts.ScriptTarget.ES6;
}

router.post('/ts', function(req, res) {
    console.log(req.body.src);
    res.send(ts.transpile(req.body.src, {
        "module": ts.ModuleKind.CommonJS,
        "noImplicitAny": true,
        "preserveConstEnums": true,
        "target" :  target(req)
    }));
});
router.post('/tsx', function(req, res) {
    res.send(ts.transpile(req.body.src, {
        "module": ts.ModuleKind.CommonJS,
        "noImplicitAny": true,
        "preserveConstEnums": true,
        "jsx" : ts.JsxEmit.React,
        "target" : target(req)
    }));
});

module.exports = router;