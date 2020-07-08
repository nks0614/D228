var express = require('express');
var router = express.Router();
var memberService = require("../modules/memberService");

router.get('/member/list.do', function(req, res, next) {
  memberService.execute("getMemberList", null, function(result) {
    res.json(result);
  });
  //res.send(memberService.getMemberList());
});

module.exports = router;
