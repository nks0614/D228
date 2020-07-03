var database = require("./database");

var api = {

    execute: function(job, params, callback)
    {
        var query = eval("this." + job)(params);
        database.executeQuery(query, callback);
    },

    getMemberList: function(params, callback) {
        var sql = "";
        sql += "SELECT a.*, b.fee_year  ";
        sql += "  FROM membership AS a ";
        sql += "  LEFT JOIN (  ";
        sql += "    	SELECT member_id, MAX(year) AS fee_year  ";
        sql += "	      FROM membership_fee  ";
        sql += "    	 GROUP BY member_id  ";
        sql += "      ) AS b ON a.member_id = b.member_id  ";
        sql += " ORDER BY a.member_id  ";
        

/*

SELECT a.*, b.year
  FROM membership AS a
  LEFT JOIN (
	SELECT member_id, MAX(year) AS year
	  FROM membership_fee
	 GROUP BY member_id
  ) AS b ON a.member_id = b.member_id;

*/


        return sql;
    },

    dummy: null
};


module.exports = api;