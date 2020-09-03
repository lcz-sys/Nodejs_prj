var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "stuManagement"
});

connection.connect();

exports.mysql = sql => {
  var promise = new Promise(function(resolve, reject) {
    connection.query(sql, function(error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  });
  return promise;
};
