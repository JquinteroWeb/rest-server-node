const { response, json } = require("express");
const bcryptjs = require("bcryptjs");

const { generateJWT } = require("../helpers/generate-jwt");
const { User } = require("../models");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {
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
        const validPassword = bcryptjs.compareSync(password, user.password);
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
const googleSingIn = async (req, res = response) => {
    const { id_token } = req.body;
    try {
        const { name, image, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });
        //If user is not registered you have to create a new user
        if (!user) {
            const data = {
                email,
                name,
                image,
                password: ':P',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        //Validate if user is active
        if (!user.status) {
            return res.status(401).json({
                message: "Contact with admin user, this user is blocked or inactive",
            });
        }

        //If all is correct we have to generate a JWT 
        const token = await generateJWT(user.id);

        res.json({           
            user,
            token
        });
    }
    catch (err) {
        res.status(400).json({
            msg: "An error occurred while verify google token"
        })
    }


}
module.exports = {
    login,
    googleSingIn,
}