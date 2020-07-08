var xlsx = require("xlsx");
var mysql = require("mysql");

var workbook = xlsx.readFile("../documents/fee.xlsx");
var worksheet = workbook.Sheets['Sheet1'];

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
        json[i].date = parseDate(json[i].date);
        json[i].fee_year = parseFeeYear(json[i].fee_year);

        //console.log(json[i]);
    }
}

function save() 
{
    //var values = makeDataArray();

    con.connect(function (err) 
    {
        if (err) throw err;

        //saveData(con, values);
        for (var i in json)
        {
            //var arr = [];
            //arr.push(values[i]);
            saveData(con, json[i]);
            //break;
        }

        con.end();
    });

}

function saveData(con, data)
{
    console.log(data);
    
    var sql = "";
    sql += "INSERT INTO membership_fee  ";
    sql += "   (member_seq, ";
    sql += "    pay_date, ";
    sql += "    amount, ";
    sql += "    year, ";
    sql += "    type, ";
    sql += "    note) ";
    sql += "VALUES  ";
    sql += "   ( ";
    sql += "    (SELECT IF(member_seq > 0, member_seq, null) FROM membership WHERE member_id = '" + data.member_id + "'), ";
    //sql += "    1, ";
    sql += "     '" + (data.date ? data.date : null) + "', ";
    sql += "     '" + (data.amount1 ? data.amount1 : 0) + "', ";
    sql += "     '" + data.fee_year + "', ";
    sql += "     '" + (data.type ? data.type : null) + "', ";
    sql += "     '" + (data.note ? data.note : null) + "' ";
    sql += "   ) ";

    var sqlQuery = con.query(sql, function(err, result) {
        if (err)
        {
            console.log("err", err);
        }
    });
}


function makeDataArray()
{
    var result = [];

    for (var i in json)
    {
        var line = makeDataLine(json[i]);
        //console.log(line);

        result.push(line);
    }

    //console.log(result);

    return result;
}

function makeDataLine(data)
{
    var result = [];
    //result.push(data.member_id);
    result.push(data.date);
    result.push(data.amount1);
    result.push(data.fee_year);
    result.push(data.type);
    result.push(data.note);

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

        var year = 2020;
        var month = parseInt(tokens[0]);
        var day = parseInt(tokens[1]);

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
    
function parseFeeYear(str)
{
    if (!str)
    {
        return "2020";
    }

    if (typeof(str) == "string" && str.trim().length >= 4)
    {
        return str.substring(0, 4);
    }
    else
    {
        return "2020";
    }
}





