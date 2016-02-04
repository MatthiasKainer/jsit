var express = require('express');
var router = express.Router();
var ts = require("typescript");

var target = function(req) {
    return !req.target || req.target === "es5" ? ts.ScriptTarget.ES5 : ts.ScriptTarget.ES6;
}

router.post('/ts', function(req, res) {
    console.log(req.body.src);
    var compileOptions = {
        "module": ts.ModuleKind.CommonJS,
        "noImplicitAny": true,
        "preserveConstEnums": true,
        "target" : target(req)
    };
    if (req.body.tsx) 
        compileOptions["jsx"] = ts.JsxEmit.React;
    res.send(ts.transpile(req.body.src, compileOptions));
});

module.exports = router;