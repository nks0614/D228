
(function($) {

    $.fn.list = function(job, options) {
        var defaultSettings = {
            list: [],
            columns: []
        };

        var settings = $.extend({}, defaultSettings, options || {});

        return this.each(function() {
            if ("make" == job)
            {
                listManager.setLayer($(this));
                listManager.makeTable(settings.columns);
                listManager.showList(settings.list);
            }
            else if ("setData" == job)
            {
                listManager.showList(settings.list);
            }
        });
    };

    var listManager = {
        sortAscendent: false,

        setLayer: function(layer)
        {
            this.layer = layer;
            this.layer.empty();
        },

        makeTable: function(columns)
        {
            this.columns = columns;

            this.table = $("<table class='table table-hover' />");
            this.table.append("<colgroup />");
            this.layer.append(this.table);

            this.makeHeader();
        },

        makeHeader: function() {
            this.thead = $("<thead />");
            this.table.append(this.thead);

            var tr = $("<tr />");
            this.thead.append(tr);

            for (var i in this.columns)
            {
                this.addColumnHead(tr, this.columns[i]);
            }
        },

        showList: function(list) {
            this.list = list;

            if (!this.tbody)
            {
                this.tbody = $("<tbody />");
                this.table.append(this.tbody);
            }
            else
            {
                this.tbody.empty();
            }

            for (var i in this.list)
            {
                this.showLine(this.list[i]);
            }
        },

        addColumnHead: function(tr, column)
        {
            var th = $("<th scope='col' />");
            th.css("text-align", "center");
            th.html(column.name);

            tr.append(th);

            var col = $("<col />");
            col.attr("width", column.width);
            this.table.find("colgroup").append(col);

            var this1 = this;
            th.on("click", function() {
                this1.sort(column);
            });
        },

        showLine: function(data)
        {
            var tr = $("<tr />");
            this.tbody.append(tr);

            for (var i in this.columns)
            {
                this.addColumnData(tr, this.columns[i], data);
            }
        },

        addColumnData: function(tr, column, data)
        {
            var td = $("<td />");
            tr.append(td);
            
            var str = this.getShownString(column, data);
            td.html(str || "&nbsp;");

            if (column.align)
            {
                td.css("text-align", column.align);
            }
        },

        sort: function(column)
        {
            if (column == this.sortColumn)
            {
                this.sortAscendent = this.sortAscendent ? false : true;
            }
            else
            {
                this.sortAscendent = true;
            }
            this.sortColumn = column;

            var this1 = this;
            this.list.sort(function(a, b) {
                var strA = this1.getShownString(column, a) || ((this1.sortAscendent) ? "zzzz" : "0000");
                var strB = this1.getShownString(column, b) || ((this1.sortAscendent) ? "zzzz" : "0000");

                var value = (strA >= strB) ? 1 : -1;
                value *= (this1.sortAscendent) ? 1 : -1;

                return value;
            });
            listManager.showList(this.list);

            this.showSortingHeader();
        },

        showSortingHeader: function()
        {
            var this1 = this;
            var ths = this.thead.find("th");
            ths.each(function(i, item) {
                if (this1.columns[i] == this1.sortColumn)
                {
                    $(item).html(this1.columns[i].name + " " + (this1.sortAscendent ? "▼" : "▲"));
                }
                else
                {
                    $(item).html(this1.columns[i].name);
                }
            });
        },

        getShownString: function(column, data)
        {
            var str;
            if (column.value)
            {
                str = column.value;
            }
            else if (column.field)
            {
                str = data[column.field];
            }

            if (column.fnFormat)
            {
                str = column.fnFormat(str, data);
            }

            if (str && typeof(str) === "string" && str.trim() == "")
            {
                str = null; 
            }

            return str;
        }

    };

})(jQuery);
