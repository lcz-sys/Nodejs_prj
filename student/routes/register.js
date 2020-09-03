var fs = require("fs");
var express = require("express");
var router = express.Router();
var moment = require("moment");
var md5 = require("md5");

router.get("/", function(req, resp) {
  return resp.render("register.html");
});

router.post("/", function(req, resp) {
  var postData = req.body;

  var fileData = fs.readFileSync("./user.json", "utf8");
  var users = JSON.parse(fileData).users;

  var user = users.find(function(item) {
    return item.account == postData.account;
  });

  if (user != null) {
    return resp.status(200).json({ status: 1, msg: "账号已存在" });
  } else if (postData.pwd === postData.pwd2) {
    fs.readFile("./user.json", "utf8", function(err, data) {
      if (err) {
        throw err;
      }
      var users = JSON.parse(data.toString()).users;
      var id = 1;
      if (users[users.length - 1].id) {
        id = users[users.length - 1].id + 1;
      }
      var md5Str = md5(postData.pwd);
      var date = moment().format("YYYY-MM-DD");
      var user = {
        id: id,
        account: postData.account,
        nick: postData.nick,
        pwd: md5Str,
        create_at: date
      };
      users.push(user);
      var UserStr = JSON.stringify({
        users: users
      });
      fs.writeFile("./user.json", UserStr, function(err) {
        if (err) {
          throw err;
        }
        return resp.status(200).json({ status: 0, msg: "注册成功" });
      });
    });
  } else {
    return resp.status(200).json({ status: 1, msg: "两次密码不一致" });
  }
});

module.exports = router;
