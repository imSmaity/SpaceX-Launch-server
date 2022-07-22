const { findOne, findByIdAndUpdate } = require('../helpers/db_query');

module.exports.verifyEmail = async (req, res) => {
	const { email, otp } = req.body;
	const user = await validateSignUp(email, otp);

	if (!user[0]) {
		res.status(400).send({ success: false, msg: user[1] });
	} else {
		res.send(user[1]);
	}
};

const validateSignUp = async (email, otp) => {
	const findUser = await findOne({ email });

	if ((findUser && findUser.otp !== otp) || !findUser) {
		return [false, 'Invalid OTP'];
	}
	await findByIdAndUpdate(findUser._id, {
		$set: { active: true },
	});
	const updatedUser = await findOne({ email });
	return [true, updatedUser];
};
