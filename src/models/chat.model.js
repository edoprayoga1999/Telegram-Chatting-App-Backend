const db = require('../config/db');
const chatModel = {
	insertChat: (sender, receiver, type, message) => {
		return new Promise((resolve, reject) => {
			db.query('INSERT INTO chats (sender, receiver, type, message) VALUES ($1, $2, $3, $4)', [sender, receiver, type, message], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	listChat: (senderId, receiverId) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT 
      chats.id, 
      chats.type, 
      chats.message, 
      chats.date, 
      userSender.id AS sender_id, 
      userSender.fullname AS sender_name, 
      userReceiver.id AS receiver_id, 
      userReceiver.fullname AS receiver_name 
      FROM chats
      INNER JOIN users AS userSender ON chats.sender=userSender.id
      INNER JOIN users AS userReceiver ON chats.receiver=userReceiver.id
      WHERE (sender = ${senderId} AND receiver = ${receiverId}) 
      OR (sender = ${receiverId} AND receiver = ${senderId})`, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	unreadChat: (senderId, receiverId) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT 
      chats.id, 
      chats.type, 
      chats.message, 
      chats.date, 
      userSender.id AS sender_id, 
      userSender.fullname AS sender_name, 
      userReceiver.id AS receiver_id, 
      userReceiver.fullname AS receiver_name 
      FROM chats
      INNER JOIN users AS userSender ON chats.sender=userSender.id
      INNER JOIN users AS userReceiver ON chats.receiver=userReceiver.id
      WHERE (sender = ${senderId} AND receiver = ${receiverId} AND is_read = 0) 
      OR (sender = ${receiverId} AND receiver = ${senderId} AND is_read = 0)`, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	deleteChat: (id, senderId) => {
		return new Promise((resolve, reject) => {
			db.query('DELETE FROM chats WHERE id=$1 AND sender=$2', [id, senderId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
};
module.exports = chatModel;