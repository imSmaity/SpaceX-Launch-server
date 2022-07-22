const router = require('express').Router();
const { usersearch } = require('../user_route/find');
const { resentOTP } = require('../user_route/resent_otp');
const { userSignin } = require('../user_route/signin');
const { userSignup } = require('../user_route/signup');
const { verifyEmail } = require('../user_route/verify');

router.post('/signup', userSignup);
router.post('/signin', userSignin);
router.post('/verify', verifyEmail);
router.post('/find_user', usersearch);
router.post('/resentOTP', resentOTP);

module.exports = router;
