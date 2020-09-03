var fs = require("fs");
var moment = require("moment");
var dbPath = "./db.json";

//检索数据库
exports.find = function(callback) {
  fs.readFile(dbPath, function(err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data.toString()).students);
  });
};

//根据id查询数据
exports.findById = function(id, callback) {
  fs.readFile(dbPath, function(err, data) {
    if (err) {
      return callback(err);
    }
    var stus = JSON.parse(data.toString()).students;
    var stu = stus.find(function(item) {
      return item.id == id;
    });
    callback(null, stu);
  });
};

//添加数据
exports.add = function(stu, callback) {
  fs.readFile(dbPath, "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    var stus = JSON.parse(data.toString()).students;
    if (stus[stus.length - 1].id) {
      stu.id = stus[stus.length - 1].id + 1;
    } else {
      stu.id = 1;
    }
    if (stu.gender == "1") {
      stu.gender = "女";
    } else {
      stu.gender = "男";
    }
    var date = moment().format("YYYY-MM-DD hh:mm:ss");
    stu.create_at = date;
    stus.push(stu);
    var stusStr = JSON.stringify({
      students: stus
    });
    fs.writeFile("./db.json", stusStr, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

//修改数据
exports.edit = function(stu, callback) {
  fs.readFile(dbPath, "utf8", function() {
    if (err) {
      return callback(err);
    }
    var stus = JSON.parse(data.toString()).students;
    stu.id = parseInt(stu.id);
    var stu = stus;
  });
};
