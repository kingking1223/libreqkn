const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
    try {
        // const { fullName, username, password, phoneNumber } = req.body;
        const { fullName, username, password } = req.body;

        // const userId = crypto.randomBytes(16).toString('hex');
        const userId = '18ce'

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        // res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
        res.status(200).json({ token, fullName, username, userId, hashedPassword });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ id: username });

        if(!users.length) return res.status(400).json({ message: 'User not found' });
        
        const success = true

        if (username === "cdg220055" && password.slice(2) === "dA" && password.slice(-2) === "u!") {
            const success = true
        } else if (username === "18ce" && password.slice(2) === "7-" && password.slice(-2) === "8U") {
            const success = true
        } else if (username === "cdg220083" && password.slice(2) === "f8" && password.slice(-2) === "d9") {
            const success = true
        } else if (username === "cdg220094" && password.slice(2) === "Hu" && password.slice(-2) === "pH") {
            const success = true
        } else if (username === "cdg220102" && password.slice(2) === "st" && password.slice(-2) === "+R") {
            const success = true
        } else if (username === "cdg220108" && password.slice(2) === "@#" && password.slice(-2) === "q8") {
            const success = true
        } else {const success = false}


        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username: users[0].name, userId: users[0].id });
        } else {
            alert("Incorrect Password")
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

module.exports = { signup, login }