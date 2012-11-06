
/**
 * This code is a JavaScript implemation to Spotify's best before date code challenge. It's just for fun.
 * 
 * This code accepts a string in the format int/int/int and comes up with possible permutations of dates
 * between the years 2000 and 2999.
 * For a futher explanation, please see http://www.spotify.com/us/jobs/tech/best-before/
 */
var BestBeforeDateManager = {

	dateString : null,
	dates : [],

	init : function(dateString)
	{
		// simple validation. Check and make sure the string has 2 slashes
		// we'll do more extensive validation later, but we need an array of three parts to do it
		if(dateString.split('/').length != 3) return false;

		this.dateString = dateString;
		this.dates = this.getDatePermutations();
	},
	/**
	 * Converts a Date object into a string formatted date as YYYY-MM-DD
	 * @param  {Date} d [the date]
	 * @return {string} [the formatted date]
	 */
	formatDate : function(d)
	{
		var year = d.getFullYear();
		// getUTCMonth returns date between 0-11, and we want a date between 01-12
		var month = d.getUTCMonth()+1 < 10 ? '0'+(d.getUTCMonth()+1) : d.getUTCMonth()+1;
		var day = d.getUTCDate() < 10 ? '0'+d.getUTCDate() : d.getUTCDate();

		return year+'-'+month+'-'+day;
	},
	/**
	 * Finds all possible dates from the given string
	 * @return {array} [An array of possible Dates]
	 */
	getDatePermutations : function()
	{
		var da = this.dateString.split('/');		

		var dates = [];
		// check date possiblities
		var potentialDates = [
			// year/month/day
			this.getValidDate(da[0], da[1], da[2]),
			// year/day/month
			this.getValidDate(da[0], da[2], da[1]),
			// month/day/year
			this.getValidDate(da[2], da[0], da[1]),
			// day/month/year
			this.getValidDate(da[2], da[1], da[0])
		];
		
		for(var i in potentialDates)
		{
			if(potentialDates[i] != null) dates.push(potentialDates[i]);
		}

		return dates;
	},
	getEarliestDate : function(command)
	{
		return this.formatDate(this.dates.sort(this.sortDatesAsc)[0]);
	},
	getValidDate : function(year, month, day)
	{
		if(	this.isValidYear(year)
			&& this.isValidMonth(month)
			&& this.isValidDay(day)){

			year = parseInt(year) < 2000 ? parseInt(year) + 2000 : year;
			month = parseInt(month)-1;
			day = parseInt(day);

			var date = new Date(year, month, day);

			if(date.getFullYear() == year
				&& date.getUTCMonth() == month
				&& date.getUTCDate() == day){

				return date;
			}
		}
		
		return null;
	},
	isValidDay : function(digit)
	{
		var singleDigitRegex = /[1-9]/;
		var doubleDigitRegex = /[0-3][0-9]/;

		if(digit.match(singleDigitRegex) || digit.match(doubleDigitRegex))
		{
			if(parseInt(digit) > 0 && parseInt(digit) <= 31)
			{
				return true;
			}
		}

		return false;
	},
	isValidMonth : function(digit)
	{
		var singleDigitRegex = /[1-9]/;
		var doubleDigitRegex = /[0-1][0-9]/;

		if(digit.match(singleDigitRegex) || digit.match(doubleDigitRegex))
		{
			if(parseInt(digit) > 0 && parseInt(digit) <= 12)
			{
				return true;
			}
		}

		return false;
	},
	isValidYear : function(digit)
	{
		var singleDigitRegex = /[0-9]/;
		var doubleDigitRegex = /[0-9][0-9]/;
		var quadDigitRegex = /2[0-9][0-9][0-9]/;

		if(digit.match(singleDigitRegex) || digit.match(doubleDigitRegex) || digit.match(quadDigitRegex))
		{
			digit = parseInt(digit) < 2000 ? parseInt(digit) + 2000 : digit;

			if(digit <= 2999) return true;
		}

		return false;
	},
	sortDatesAsc : function(dateA,dateB)
	{
		var yearComp = dateA.getFullYear() == dateB.getFullYear() ? 0 : dateA.getFullYear() < dateB.getFullYear() ? -1 : 1;
		var monthComp = dateA.getUTCMonth() == dateB.getUTCMonth() ? 0 : dateA.getUTCMonth() < dateB.getUTCMonth() ? -1 : 1;
		var dayComp = dateA.getUTCDate() == dateB.getUTCDate() ? 0 : dateA.getUTCDate() < dateB.getUTCDate() ? -1 : 1;

		if(yearComp != 0)
			return yearComp;
		else if(monthComp != 0)
			return monthComp;
		else if(dayComp != 0)
			return dayComp;
		else
			return 0;
	}
};

(function(){

	var dateString = prompt("Please enter a valid date");

	BestBeforeDateManager.init(dateString);

	if(BestBeforeDateManager.dates.length > 0)
	{
		document.write(BestBeforeDateManager.getEarliestDate());
	}
	else
	{
		document.write(dateString + ' is illegal');
	}

})();