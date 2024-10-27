const pool = require('../config/db');

async function addUser(name, surname, email, username) {
    const res = await pool.query('INSERT INTO users (name, surname, email, username) VALUES ($1, $2, $3, $4) RETURNING *', [name, surname, email, username]);
    return res.rows[0];
}

async function getUsers() {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
}

async function updateUser(id, name, surname, email, username) {
    const res = await pool.query('UPDATE users SET name = $1, surname = $2, email = $3, username = $4 WHERE id = $5', [id, name, surname, email, username]);
    return res.rows[0];
}

async function deleteUser(id) {
    const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
}

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser
};