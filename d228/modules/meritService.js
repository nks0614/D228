var database = require("./database");

var api = {
  execute: function (job, params, callback) {
    var query = eval("this." + job)(params);
    database.executeQuery(query, callback);
  },

  getMeritList: function (params, callback) {
    var sql = "";
    sql += "SELECT *  ";
    sql += "  FROM merit ";
    sql += " ORDER BY serial_number  ";
    return sql;
  },

  dummy: null
};

module.exports = api;
