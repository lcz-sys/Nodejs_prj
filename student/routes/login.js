var express = require("express");
var router = express.Router();
var fs = require("fs");
var md5 = require("md5");

var userModel = require("../models/stu");

router.get("/", function(req, resp) {
  return resp.render("login.html");
});

router.post("/", function(req, resp) {
  var postData = req.body;

  var fileData = fs.readFileSync("./user.json", "utf8");
  var users = JSON.parse(fileData).users;

  var user = users.find(function(item) {
    return item.account == postData.account;
  });

  if (!user) {
    return resp.status(200).json({ status: 1, msg: "用户不存在" });
  }

  if (user.pwd !== md5(postData.pwd)) {
    return resp.status(200).json({ status: 1, msg: "密码错误" });
  }

  return resp.status(200).json({ status: 0, msg: "登录成功" });
});

router.get("/forget", function(req, resp) {
  return resp.render("forget.html");
});

router.get("/register", function(req, resp) {
  return resp.render("register.html");
});

module.exports = router;
