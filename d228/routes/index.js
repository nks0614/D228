var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('member/list');
});

router.get('/member/list', function(req, res, next) {
  res.render('member/list');
});

router.get('/member/register', function(req, res, next) {
  res.render('member/register');
});

router.get('/data/sample', function(req, res, next) {
  res.send({name: "영창", age: 11});
});

/*
router.get('/include/header', function(req, res, next) {
  res.render('include/header');
});
*/

module.exports = router;
