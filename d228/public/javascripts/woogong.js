	/* 정규식 */
	var REGEX_TIME_HHMM = /([01][0-9]|2[0-3])[\:\s]*([0-6][0-9])$/;

	/***** Date *****/
	var MONTH_NAMES = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY",
	                   "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	
	var WEEK_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	Date.prototype.format = function(f) {
	    if (!this.valueOf()) return " ";
	 
	    var weekName = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
	    var weekNameShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	    var weekNameKr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	    var d = this;
	     
	    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|SSS|a\/p)/gi, function($1) {
	        switch ($1) {
	            case "yyyy": return d.getFullYear();
	            case "yy": return (d.getFullYear() % 1000).zf(2);
	            case "MM": return (d.getMonth() + 1).zf(2);
	            case "dd": return d.getDate().zf(2);
	            case "E": return weekNameKr[d.getDay()];
	            case "e": return weekNameShort[d.getDay()];
	            case "HH": return d.getHours().zf(2);
	            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
	            case "mm": return d.getMinutes().zf(2);
	            case "ss": return d.getSeconds().zf(2);
	            case "SSS": return d.getMilliseconds().zf(3);
	            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
	            default: return $1;
	        }
	    });
	};
	
	function parseDate(s)
	{
		if (!s) {return null;}
		if (s.length == 0)
		{
			return null;
		}
		
		s= s.replace(/\-/g, "");
		
		var years = 0;
		var months = 0;
		var days = 0;
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var milliSeconds = 0;
		
		if (s.length >= 8)
		{
			years = parseInt(s.substring(0, 4));
			months = parseInt(s.substring(4, 6)) - 1;
			days = parseInt(s.substring(6, 8));
		}
		if (s.length >= 14)
		{
			hours = parseInt(s.substring(8, 10));
			minutes = parseInt(s.substring(10, 12));
			seconds = parseInt(s.substring(12, 14));
		}
		if (s.length == 17)
		{
			milliSeconds = parseInt(s.substring(14));
		}
		
		var time = new Date();
		time.setFullYear(years, months, days);
		time.setHours(hours, minutes, seconds, milliSeconds);
		
		return time;
	}
	
	
	function isNowIncluded(from, to)
	{
		var now = new Date().getTime();
		
		if (from == null)
		{
			if (to == null)
			{
				return true;
			}
			else
			{
				to.setHours(23, 59, 59, 999);
				return (now <= to.getTime());
			}
		}
		else
		{
			from.setHours(0, 0, 0, 0);
			
			if (to == null)
			{
				return (now >= from.getTime());
			}
			else
			{
				to.setHours(23, 59, 59, 999);
				return ((now >= from.getTime()) && (now <= to.getTime()));
			}
		}
	}
	
	
	/***** String *****/
	String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
	String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
	Number.prototype.zf = function(len){return this.toString().zf(len);};
	
	function initExtraProtoType() {
		if(typeof String.prototype.trim !== 'function') {
		    String.prototype.trim = function() {
		        return this.replace(/^\s+|\s+$/g, ''); 
		    };
		}
		
	}
	
	if (!String.prototype.endsWith) {
		  String.prototype.endsWith = function(searchString, position) {
		      var subjectString = this.toString();
		      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
		        position = subjectString.length;
		      }
		      position -= searchString.length;
		      var lastIndex = subjectString.indexOf(searchString, position);
		      return lastIndex !== -1 && lastIndex === position;
		  };
		}

	
	/***** 우편번호 *****/
	function zip(fnCallback)	// <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script> 추가되어 있어야 함
	{
		new daum.Postcode({
	        oncomplete: function(data) {
	            var zipcode = data.zonecode;
	            var address = data.address;
	            
	            if (fnCallback)
	            {
	            	fnCallback(zipcode, address);
	            }
	            
	        }
	    }).open();
		
	}
	

	/***** 전화번호 Parser *****/
	function PhoneNumber()
	{
		this.phoneNumber1 = "";
		this.phoneNumber2 = "";
		this.phoneNumber3 = "";
		
		this.validPhoneNumber = false;
	}
	
	PhoneNumber.prototype.parse = function(phoneNumber)
	{
		if (phoneNumber == "")
		{
			this.valid = true;
			return;
		}
		
		var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;	// xxx xxxx xxxx
		var result = phoneNumber.match(regex);

		if (!result)
		{
			regex = /^\(?([02]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;	// 02 xxx xxxx
			result = phoneNumber.match(regex);
		}

		if (!result)
		{
			regex = /^\(?([02]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;	// 02 xxxx xxxx
			result = phoneNumber.match(regex);
		}

		if (!result)
		{
			regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;	// xxx xxx xxxx
			result = phoneNumber.match(regex);
		}

		if (result)
		{
			this.phoneNumber1 = result[1];
			this.phoneNumber2 = result[2];
			this.phoneNumber3 = result[3];
			
			this.valid = true;
		}
		else
		{
			this.valid = false;
		}
	};
	
	/**
	 * 파일 이름의 확장자를 이용해서 주어진 파일 이름을 가진 파일이 사진(그림) 파일인지 여부를 되돌린다.
	 * 
	 * @param fileName 파일 이름
	 * @returns 사진(그림) 파일이면 true, 아니면 false
	 */
	function isImageFile(fileName)
	{
		return (fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/));
	}

	
	/**
	 * 파일 이름의 확장자를 이용해서 주어진 파일 이름을 가진 파일이 동영상 파일인지 여부를 되돌린다.
	 * 
	 * @param fileName 파일 이름
	 * @returns 동영상 파일이면 true, 아니면 false
	 */
	function isMovieFile(fileName)
	{
		return (fileName.toLowerCase().match(/\.(avi|mp4|mpg|mpeg|mpe|wmv|asf|asx)$/));
	}
	
	
	function setCookie(name, value, expireDay) 
	{
		var cookies = name + '=' + escape(value) + '; path=/ ';

		if (typeof expireDay != 'undefined')
		{
			var expire = new Date();
			expire.setDate(expire.getDate() + expireDay);
			cookies += ';expires=' + expire.toGMTString() + ';';
		}
			
		document.cookie = cookies;
	}
	
	function getCookie(name) {
		name = name + '=';
		var cookieData = document.cookie;

		var start = cookieData.indexOf(name);
		var value = '';
		
		if (start != -1) 
		{
			start += name.length;
			var end = cookieData.indexOf(';', start);
			if (end == -1)
			{
				end = cookieData.length;
			}
			value = cookieData.substring(start, end);
		}
		return unescape(value);
	}

	
	function removeDuplicatedItem(list)
	{
		if (list instanceof Array)
		{
			var removeCount = 0;
			for (var i = 0 ; i < list.length ; i++)
			{
				for (var j = i + 1 ; j < list.length ; j++)
				{
					removeCount = 0;
					
					if (list[i] == list[j])
					{
						list.splice(j, 1);
						
						j--;
						removeCount++;
					}
				}
				i -= removeCount;
			}
		}
	}
	
	
	/**
	 * 임의의 object에 포함되어 이벤트 발생과 수신을 담당할 이벤트 관리자
	 */
	function EventDispatcher()
	{
		this.listenerMap = {};
	}
	
	/* 이벤트 리스너를 등록한다. */
	EventDispatcher.prototype.addEventListener = function(eventType, fnListener)
	{
		var listeners = this.listenerMap[eventType];
		if (listeners === undefined)
		{
			listeners = [];
			this.listenerMap[eventType] = listeners;
		}
		
		listeners.push(fnListener);
	};
	
	/* 이벤트 리스너를 제거한다. */
	EventDispatcher.prototype.removeEventListener = function(eventType, fnListener)
	{
		var listeners = this.listenerMap[eventType];
		if (listeners)
		{
			for (var i in listeners)
			{
				if (listeners[i] === fnListener)
				{
					listeners.splice(i, 1);
					break;
				}
			}
		}
	};
	
	/* 이벤트를 발생시킨다. */
	EventDispatcher.prototype.dispatchEvent = function(eventType)
	{
		var listeners = this.listenerMap[eventType];

		if (listeners)
		{
			var args = [];
			for (var j = 1 ; j < arguments.length ; j++)
			{
				args.push(arguments[j]);
			}
			
			for (var i in listeners)
			{
				listeners[i].apply(this, args);
			}
		}
	};

	
	function zeroFill( number, width )
	{
		width -= number.toString().length;
		if (width > 0) {
			return new Array(width + (/\./.test(number) ? 2 : 1)).join('0')
					+ number;
		}
		return number + "";
	}
	
	
	function justifyLabels()
	{
		$(".form_item label").each(function(index, label) {
			var $label = $(label);
			var labelWidth = $label.width();
			labelWidth = 80;
			var text = $label.html().trim();
			
			var div = $("<div>");
			div.css("width", " 200px")
			div.css("height", "15px");
			div.html(text);
			
			$label.empty();
			$label.append(div);
			
			var fontName = $label.css("font-family");
			var wordWidth = getWidthOfText(text, fontName, $label.css("font-size"));

			var letterSpacing = ((((labelWidth - 0) - (wordWidth + 0)) /  (text.length - 1))) * 1.0; 
			
			$label.css("letter-spacing", letterSpacing + "px");
		});
		
		
		function getWidthOfText(txt, fontname, fontsize)
		{
			  // Create dummy span
			  var e = document.createElement('span');
			  // Set font-size
			  e.style.fontSize = fontsize;
			  // Set font-face / font-family
			  e.style.fontFamily = fontname;
			  // Set text
			  e.innerHTML = txt;
			  document.body.appendChild(e);
			  // Get width NOW, since the dummy span is about to be removed from the document
			  var w = e.offsetWidth;
			  // Cleanup
			  document.body.removeChild(e);
			  // All right, we're done
			  return w;
			}
	}

	function formatNumber(x) 
	{
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	function formatNewline(src)
	{
		return replaceAll(src, "\n", "<br>");
	}

	function replaceAll(str, searchStr, replaceStr) 
	{
		return str.split(searchStr).join(replaceStr);
	}
