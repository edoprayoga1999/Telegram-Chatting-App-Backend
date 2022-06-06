const db = require('../config/db');
const userModel = {
	listUser: (name) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT id, email, fullname, username, phone, bio, photo FROM users WHERE lower(fullname) LIKE LOWER('%${name}%')`, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	updateProfile: (id, fullname, username, phone, bio) => {
		return new Promise((resolve, reject) => {
			db.query('UPDATE users SET fullname=$2, username=$3, phone=$4, bio=$5 WHERE id=$1', [id, fullname, username, phone, bio], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	updatePhoto: (id, photo) => {
		return new Promise((resolve, reject) => {
			db.query('UPDATE users SET photo=$2 WHERE id=$1', [id, photo], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	getPhoto: (id) => {
		return new Promise((resolve, reject) => {
			db.query('SELECT photo FROM users WHERE id=$1', [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	getDetailUser: (id) => {
		return new Promise((resolve, reject) => {
			db.query('SELECT id, email, fullname, username, phone, bio, photo FROM users WHERE id=$1', [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
};
module.exports = userModel;