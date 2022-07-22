const User = require('../models/UserModal.js');

module.exports.usersearch = async (req, res) => {
	const { email } = req.body;
	const user = await User.findById(email);

	if (user) {
		res.send(user);
	} else res.status(400).send({ success: false, msg: 'Network error!!' });
};
