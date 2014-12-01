/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	login : function(req, res) {
		var bcrypt = require('bcrypt');
		
		console.log(req.body.email);
		
		User.findOneByEmail(req.body.email, function(err, user) {
			if (err)
				res.json({
					error : 'DB error'
				}, 500);


			if (user) {
				bcrypt.compare(req.body.password, user.password, function(err, match) {
					if (err)
						res.json({
							error : 'Server error1'
						}, 500);

					if (match) {
						// password match
						req.session.user_object = user;
						res.json(user);
					} else {
						// invalid password
						if (req.session.user)
							req.session.user = null;
						res.json({
							error : 'Invalid password'
						}, 400);
					}
				});
			} else {
				res.json({
					error : 'User not found'
				}, 404);
			}
		});
	},

	logout : function(req, res) {
		req.session.user = null;
		res.send("Successfully logged out");
	}
};

