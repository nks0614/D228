
$(document).ready(function() {
    memberListManager.setEventHandlers();
    memberListManager.readList(memberListManager.showList);
});

var memberListManager = {

    setEventHandlers: function()
    {
        $("input[name='query']").on("keyup", function() {
            memberListManager.filter();
        })
    },

    readList: function(callback) {
        $.get("/rest/member/list.do", null, function(response) {
            console.log(response);
            callback(response);
        });
    },

    showList: function(list)
    {
        memberListManager.list = list;

        var params = {
            list: list,
            columns: [
                {name: "아이디", field: "member_id", align: "center", width: "120px"},
                {name: "순번", field: "seq", align: "center", width: "80px"},
                {name: "성명", field: "name", align: "center", width: "100px"},
                {name: "회비납부", field: "", value: "O", align: "center", width: "100px"},
                {name: "생년월일", field: "birthday", align: "center", width: "120px", fnFormat: memberListManager.formatDate},
                {name: "가입일", field: "register_date", align: "center", width: "120px", fnFormat: memberListManager.formatDate},
                {name: "소속(직업)", field: "job", width: "*"}
            ],
        };

        $("#div_member_list").list("make", params);
    },

    filter: function()
    {
        var query = $("input[name='query']").val();

        var filtered = [];
        var data;
        for (var i in this.list)
        {
            data = this.list[i];
            if (data.name && data.name.indexOf(query) >= 0)
            {
                filtered.push(data);
            }
        }
        console.log(filtered);

        $("#div_member_list").list("setData", {list:filtered});
    },

    formatDate: function(value, data)
    {
        if (value)
        {
            var date = new Date(value);
            return date.format("yyyy.MM.dd");
        }
    }

};

