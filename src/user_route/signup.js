const { findOne } = require('../helpers/db_query');
const User = require('../models/UserModal');
const { encrypt } = require('../services/crypto');
const { sendMail } = require('../services/MAIL');
const { generateOTP } = require('../services/OTP');

module.exports.userSignup = async (req, res) => {
	const { email } = req.body;
	const isExisting = await findUserByEmail(email);
	let newUser;

	if (isExisting) {
		res
			.status(400)
			.send({ success: false, msg: 'This email already registered.' });
	} else {
		newUser = await createUser(req.body);
		if (!newUser[0]) {
			res.status(400).send({ success: false, msg: newUser[1] });
		} else {
			res.send(newUser[1]);
		}
	}
};

const findUserByEmail = async (email) => {
	const user = await findOne({ email });
	if (!user) return false;
	return user;
};

const createUser = async (data) => {
	const { email, name, password } = data;

	const hashedPassword = await encrypt(String(password));
	const otpGenerated = generateOTP();

	const newUser = await User.create({
		_id: email,
		name,
		email,
		password: hashedPassword,
		otp: otpGenerated,
	});
	try {
		await sendMail({
			to: email,
			OTP: otpGenerated,
		});
		return [true, newUser];
	} catch (error) {
		return [false, 'Unable to sign up, Please try again later'];
	}
};
