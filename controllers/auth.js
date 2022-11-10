const { response } = require("express");
const bcryptjs = require("bcryptjs");

const { generateJWT } = require("../helpers/generate-jwt");
const { User } = require("../models/user");


const loguin = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //verify email if user exists

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User or password is incorrect"
            });
        }
        //validate if user is active
        if (!user.status) {
            return res.status(400).json({
                message: "User is not active"
            });
        }

        //validate password
        const validPassword =  bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "User or password is incorrect"
            });
        }
        //Generate de json web token
        const token = await generateJWT(user.id);

        res.json({
            success: true,
            message: user,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error logging in",
        });
    }

};

module.exports = {
    loguin
}