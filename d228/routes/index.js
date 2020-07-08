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

router.get("/data/sample", function (req, res, next) {
  res.send({ name: "영창", age: 11 });
});

router.get("/member/detail", function (req, res, next) {
  res.render("member/detail");
});

router.get("/merit/register", function (req, res, next) {
  res.render("merit/register");
});
router.get("/merit/changeinfo", function (req, res, next) {
  res.render("merit/changeinfo");
});
/*
router.get('/include/header', function(req, res, next) {
  res.render('include/header');
});
*/

module.exports = router;
