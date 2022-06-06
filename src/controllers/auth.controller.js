const bcrypt = require('bcrypt');
const authModel = require('../models/auth.model');
const { success, failed } = require('../helpers/response');
const jwtToken = require('../helpers/generateJwtToken');

const authController = {
	register: (req, res) => {
		try {
			const { email, password, fullname } = req.body;
			if (!email || !password || !fullname) {
				throw Error('All field must be filled');
			}
			authModel.checkEmailRegistered(email.toLowerCase())
				.then(() => {
					bcrypt.hash(password, 10, (err, hash) => {
						if (err) {
							failed(res, {
								code: 500,
								status: 'failed',
								message: err.message,
								error: err
							});
						} else {
							authModel.register(email.toLowerCase(), hash, fullname)
								.then(() => {
									success(res, {
										code: 200,
										status: 'success',
										message: 'User registered successfully'
									});
								})
								.catch((err) => {
									failed(res, {
										code: 500,
										status: 'failed',
										message: err.message,
										error: err
									});
								});
						}
					});
				})
				.catch((err) => {
					failed(res, {
						code: 500,
						status: 'failed',
						message: err.message,
						error: err
					});
				});
		} catch (err) {
			failed(res, {
				code: 500,
				status: 'error',
				message: err.message,
				error: err
			});
		}
	},
	login: (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw Error('All field must be filled');
			}
			authModel.login(email.toLowerCase())
				.then((result) => {
					if (!result.rowCount) {
						failed(res, {
							code: 500,
							status: 'failed',
							message: 'Wrong email or password',
							error: []
						});
					} else {
						bcrypt.compare(password, result.rows[0].password)
							.then(async (match) => {
								if (match) {
									const token = await jwtToken(result.rows[0]);
									success(res, {
										code: 200,
										status: 'success',
										message: 'Login successfull',
										token,
										data: result.rows[0]
									});
								} else {
									failed(res, {
										code: 500,
										status: 'failed',
										message: 'Wrong email or password',
										error: []
									});
								}
							});
					}
				})
				.catch((err) => {
					failed(res, {
						code: 500,
						status: 'failed',
						message: err.message,
						error: err
					});
				});
		} catch (err) {
			failed(res, {
				code: 500,
				status: 'error',
				message: err.message,
				error: err
			});
		}
	}
};

module.exports = authController;