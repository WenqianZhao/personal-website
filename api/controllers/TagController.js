/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * Get all tags
	 * @param  {obj}  	req
	 * @param  {obj}	res
	 * @return {obj}
	 */
	getAllTags: function(req, res) {
		Tag.find()
		.exec(function(err, tags){
			if(err) return ResponseService.json(400, res, 2000, err.Errors);
			if(tags.length === 0){
				// No tag now
				return ResponseService.json(200, res, 2001);
			} else {
				var responseData = tags.map(function (tag) {
					return {
						id: tag.id,
						content: tag.content
					}
				});
				return ResponseService.json(200, res, 2002, responseData);
			}
		});
	},
}