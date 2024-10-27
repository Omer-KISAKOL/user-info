const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { name, surname, email, username } = req.body;

    try {
        const user = await User.addUser(name, surname, email, username);
        res.status(201).json(user);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getUsers();
        res.json(users);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, username } = req.body;

    try {
        const user = await User.updateUser(id, name, surname, email, username);
        res.json(user);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.deleteUser(id);
        res.json(user);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
};