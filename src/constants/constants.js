require('dotenv').config();
module.exports = {
	allowedOrigins: ['http://localhost:9000/'],
	SERVER_PORT: process.env.PORT || 9000,
	SERVER_DB_URI: process.env.URI,
	OTP_LENGTH: 6,
	OTP_CONFIG: {
		upperCaseAlphabets: false,
		specialChars: false,
	},
	MAIL_SETTINGS: {
		service: 'gmail',
		auth: {
			user: process.env.MAIL_EMAIL,
			pass: process.env.MAIL_PASSWORD,
		},
	},
};
