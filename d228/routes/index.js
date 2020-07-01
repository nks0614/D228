var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("member/list");
});

router.get("/member/list", function (req, res, next) {
  res.render("member/list");
});

router.get("/member/register", function (req, res, next) {
  res.render("member/register");
});

router.get("/member/detail", function (req, res, next) {
  res.render("member/detail");
});

router.get("/merit/register", function (req, res, next) {
  res.render("merit/register");
});

/*
router.get('/include/header', function(req, res, next) {
  res.render('include/header');
});
*/

module.exports = router;
