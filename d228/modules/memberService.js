var database = require("./database");

var api = {

    execute: function(job, params, callback)
    {
        var query = eval("this." + job)(params);
        database.executeQuery(query, callback);
    },

    getMemberList: function(params, callback) {
        var sql = "";
        sql += "SELECT *  ";
        sql += "  FROM membership ";
        sql += " ORDER BY member_id  ";
        
        return sql;
    },

    dummy: null
};


module.exports = api;