const db = require('../config/db');
const authModel = {
	register: (email, password, fullname) => {
		return new Promise((resolve, reject) => {
			db.query('INSERT INTO users (email, password, fullname) VALUES ($1, $2, $3)', [email, password, fullname], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	checkEmailRegistered: (email) => {
		return new Promise((resolve, reject) => {
			db.query('SELECT COUNT(*) FROM users WHERE email=$1', [email], (err, result) => {
				if (err) {
					reject(err);
				} else if (result.rows[0].count > 0) {
					reject(new Error('Email already registered!'));
				} else {
					resolve(result);
				}
			});
		});
	},
	login: (email) => {
		return new Promise((resolve, reject) => {
			db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
};
module.exports = authModel;