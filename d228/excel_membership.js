var xlsx = require("xlsx");
var mysql = require("mysql");

var workbook = xlsx.readFile("excel/membership.xlsx");
var worksheet = workbook.Sheets['시트'];

var json = xlsx.utils.sheet_to_json(worksheet);

var con = mysql.createConnection({
    host: "211.53.209.159",
    user: "d228",
    password: "eothrhpr2",
    database: "d228"
});

makeData();

//save();


function makeData()
{
    for (var i in json)
    {
        json[i].birthday = parseDate(json[i].birthday);
        json[i].register_date = parseDate(json[i].register_date);

        console.log(json[i]);

        
    }
}

function save() 
{
    var values = makeDataArray();

    con.connect(function (err) 
    {
        if (err) throw err;
        

        con.end();
    });

}

function makeDataArray()
{

}

function saveMembership(data)
{
    //console.log("saveMembership", data);
    data.birthday = parseDate(data.birthday);
    data.register_date = parseDate(data.register_date);

    console.log(data);

    /*
    var sql = "";
    sql += "INSERT INTO membership";
    sql += "    (member_id  ";
    sql += "     seq, ";
    sql += "     name, ";
    sql += "     birthday, ";
    sql += "     register_date, ";
    sql += "     zipcode, ";
    sql += "     address, ";
    sql += "     phone_home, ";
    sql += "     phone_mobie, ";
    sql += "     introducer_id, ";
    sql += "     note, ";
    sql += "     type) ";
    sql += "VALUES ";
    sql += "    ( ";
    str += "      '" + data.member_id + ", ";
    str += "      " + data.seq + ", ";
    str += "      '" + data.name + ", ";
    str += "      '" + data.birthday + ", ";
    str += "      '" + data.register_date + ", ";
    str += "      '" + data.job + ", ";
    str += "      '" + data.zipcode + ", ";
    str += "      '" + data.address + ", ";
    str += "      '" + data.phone_home + ", ";
    str += "      '" + data.phone_mobile + "', ";
    str += "      null, ";
    str += "      'M'";
    str += "    )  ";
    */
   
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



