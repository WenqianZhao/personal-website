module.exports = {
	/**
	 * Sort function
	 * @param  {string} prop  property of object to sort on
	 * @param  {integer} order 1 for ascending and -1 for descending
	 * @return {integer}       stand for the final order
	 */
	sortFunction: function (prop, order) {
		return function (a, b) {
			var result = 0;
			if (a[prop] < b[prop]) {
				result = -1;
			} else if (a[prop] === b[prop]) {
				result = 0;
			} else {
				result = 1;
			}
			return result * order;
		}
	},
}