var express = require('express');
var router = express.Router();
var StuModel = require('../models/stu');

router.get('/', function (req, resp) {
    StuModel.find(function (err, stus) {
        if (err) {
            return res.status(500).send('Server Error');
        }
        resp.render('index.html', {
            msgs: stus
        });
    });
});

router.get('/add', function (req, resp) {
    resp.render('new.html');
});

router.post('/add', function (req, resp) {
    StuModel.add(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server Error');
        }
        resp.redirect('/stu');
    });
});

router.get('/stu/edit', function (req, resp) {
    StuModel.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return resp.status(500).send('Server Error');
        }
        resp.render('edit.html', {
            student: student
        });
    });
});

module.exports = router;