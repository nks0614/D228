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

router.get("/manager/register", function (req, res, next) {
  res.render("manager/register");
});

router.get("/manager/list", function (req, res, next) {
  res.render("manager/list");
});

router.get("/manager/detail", function (req, res, next) {
  res.render("manager/detail");
});

router.get("/manager/edit", function (req, res, next) {
  res.render("manager/edit");
});

router.get("/merit/register", function (req, res, next) {
  res.render("merit/register");
});

router.get("/merit/list", function (req, res, next) {
  res.render("merit/list");
});

router.get("/merit/changeinfo", function (req, res, next) {
  res.render("merit/changeinfo");
});

router.get("/merit/detail", function (req, res, next) {
  res.render("merit/detail");
});

/*
router.get('/include/header', function(req, res, next) {
  res.render('include/header');
});
*/

module.exports = router;
