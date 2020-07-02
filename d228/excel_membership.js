var xlsx = require("xlsx");
var mysql = require("mysql");

var workbook = xlsx.readFile("../documents/membership.xlsx");
var worksheet = workbook.Sheets['시트'];

var json = xlsx.utils.sheet_to_json(worksheet);

var con = mysql.createConnection({
    host: "211.53.209.159",
    user: "d228",
    password: "eothrhpr2",
    database: "d228"
});

makeData();

save();


function makeData()
{
    for (var i in json)
    {
        json[i].birthday = parseDate(json[i].birthday);
        json[i].register_date = parseDate(json[i].register_date);

        //console.log(json[i]);
    }
}

function save() 
{
    var values = makeDataArray();

    con.connect(function (err) 
    {
        if (err) throw err;

        //saveData(con, values);
        for (var i in values)
        {
            var arr = [];
            arr.push(values[i]);
            saveData(con, arr);
        }

        con.end();
    });

}

function saveData(con, data)
{
    console.log(data);
    
    var sql = "";
    sql += "INSERT INTO membership  ";
    sql += "   (member_id, ";
    sql += "    seq, ";
    sql += "    name, ";
    sql += "    birthday, ";
    sql += "    register_date, ";
    sql += "    job, ";
    sql += "    zipcode, ";
    sql += "    address, ";
    sql += "    phone_home, ";
    sql += "    phone_mobile, ";
    //sql += "    introducer_id, ";
    sql += "    note, ";
    sql += "    type) ";
    sql += "VALUES ? ";

    var sqlQuery = con.query(sql, [data], function(err, result) {
        console.log("err", err);
        //console.log("result", result);
    });

    //console.log("sqlQuery", sqlQuery);
}

function makeDataArray()
{
    var result = [];

    for (var i in json)
    {
        var line = makeDataLine(json[i]);
        result.push(line);
    }

    //console.log(result);

    return result;
}

function makeDataLine(data)
{
    var result = [];
    result.push(data.member_id);
    result.push(data.seq);
    result.push(data.name);
    result.push(data.birthday);
    result.push(data.register_date);
    result.push(data.job);
    result.push(data.zipcode);
    result.push(data.address);
    result.push(data.phone_home);
    result.push(data.phone_mobile);
    //result.push(data.introducer);
    result.push(data.note);
    result.push("M");

    return result;
}


function parseDate(str)
{
    if (!str)
    {
        return null;
    }

    if (typeof(str) == 'string')
    {
        var tokens = str.split(".");

        if (tokens.length < 3)
        {
            return null;
        }

        var year = parseInt(tokens[0]);
        var month = parseInt(tokens[1]);
        var day = parseInt(tokens[2]);

        if (year > 20)
        {
            year = 1900 + year;
        }
        else
        {
            year = 2000 + year;
        }

        var result ="";
        result += year + "-";
        if (month < 10)
        {
            result += "0";
        }
        result += month + "-";
        if (day < 10)
        {
            result += "0";
        }
        result += day;

        return result;
        
    }

}



