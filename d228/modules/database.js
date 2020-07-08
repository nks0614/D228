var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "211.53.209.159",
    user: "d228",
    password: "eothrhpr2",
    database: "d228"
});

var database = {
    
    executeQuery: function(query, callback) {
        pool.getConnection((err, connection) => {
            if (err)
            {
                if (err.code === 'PROTOCOL_CONNECTION_LOST')
                {
                    console.error("Database connection was closed.");
                }
                else if (err.code === 'ER_CON_COUNT_ERROR') 
                {
                    console.error('Database has too many connections.')
                }
                else if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }

                throw err;
            }
        
            if (connection) 
            {
                connection.query(query, function(err, result, fields) {
                    if (err)
                    {
                        throw err;
                    }

                    if (callback)
                    {
                        callback(result);
                    }
                });

                connection.release();
            }
        
            return;
        });
    }
};

/*
pool.getConnection((err, connection) => {
    if (err)
    {
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
        {
            console.error("Database connection was closed.");
        }
        else if (err.code === 'ER_CON_COUNT_ERROR') 
        {
            console.error('Database has too many connections.')
        }
        else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) 
    {
        connection.release();
    }

    return;
});
*/

module.exports = database;