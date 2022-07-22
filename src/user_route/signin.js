const { compare } = require('bcrypt');
const User = require('../models/UserModal');

module.exports.userSignin = async (req, res) => {
	const { email, password } = req.body;
	const user = await findUserByEmail(email);

	if (user) {
		if (await compare(String(password), user.password)) res.send(user);
		else
			res.status(400).send({ success: false, msg: 'Wrong email or password.' });
	} else res.status(400).send({ success: false, msg: 'Wrong email.' });
};

const findUserByEmail = async (email) => {
	const user = await User.findOne({
		email: email,
	});
	if (user) return user;
	return false;
};
