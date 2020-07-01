
(function($) {

    $.fn.dateInput = function(options) {
        var settings = $.extend({}, options || {});

        return this.each(function() {
            $(this).on("keyup", function(event) {
                $(event.target).val(formatDate($(event.target).val()));
            });

            if (settings.defaultDate)
            {
                $(this).val(settings.defaultDate.format("yyyy-MM-dd"));
            }
        });
    };

    function formatDate(str)
    {
        var strDigits = removeNonDigits(str);

        if (strDigits.length > 3)
        {
            strDigits = appendChar(strDigits, 4, "-");
        }
        if (strDigits.length > 6)
        {
            strDigits = appendChar(strDigits, 7, "-");
        }

        if (strDigits.length > 10)
        {
            strDigits = strDigits.substring(0, 10);
        }

        if (strDigits.length == 10)
        {
            strDigits = validateDate(strDigits);
        }

        return strDigits;
    }

    function appendChar(str, index, ch)
    {
        if (str.length >= index)
        {
            var newStr = str.substring(0, index);
            newStr += ch;

            if (str.length != index)
            {
                newStr += str.substring(index);
            }

            return newStr;
        }
        else
        {
            return str;
        }
    }

    function validateDate(dateStr)
    {
        var date = parseDate(dateStr);
        return date.format("yyyy-MM-dd");
    }

    function removeNonDigits(str)
    {
        var strDigits = "";
        for (var i = 0 ; i < str.length ; i++)
        {
            var ch = str.charAt(i);
            if (ch >= '0' && ch <= '9')
            {
                strDigits += ch;
            }
        }

        return strDigits;
    }


}(jQuery));

