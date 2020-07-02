
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
            
            var str = "";
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

            td.html(str || "&nbsp;");

            if (column.align)
            {
                td.css("text-align", column.align);
            }
        },

    };

})(jQuery);
