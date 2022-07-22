const { findOne, findByIdAndUpdate } = require('../helpers/db_query');
const { sendMail } = require('../services/MAIL');
const { generateOTP } = require('../services/OTP');

module.exports.resentOTP = async (req, res) => {
	const { email } = req.body;
	const isExisting = await findUserByEmail(email);

	if (isExisting) {
		const status = await generateNewOTP(req.body);
		res.status(200).send({
			success: status[0],
			msg: status[1],
		});
	} else {
		res.status(400).send({
			success: false,
			msg: 'Unable to OTP sent, Please try again later.',
		});
	}
};

const findUserByEmail = async (email) => {
	const user = await findOne({ email });
	if (!user) return false;
	return user;
};

const generateNewOTP = async (data) => {
	const { email } = data;
	const otpGenerated = generateOTP();

	try {
		await sendMail({
			to: email,
			OTP: otpGenerated,
		});
		await findByIdAndUpdate(email, {
			$set: { otp: otpGenerated },
		});
		return [true, 'OTP sent successfully'];
	} catch (error) {
		return [false, 'Unable to OTP sent, Please try again later'];
	}
};
