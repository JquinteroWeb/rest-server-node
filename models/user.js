const { Schema, model } = require('mongoose');

//Disigned for collection user.
const UserSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        phone: {
            type: String,
            //required: [true, 'Phone is required']
        },
        image: {
            type: String,
            default: ''
        },
        role: {
            type: String,            
            enum: ['user', 'admin'],
            default: 'user'
        },
        status: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        }
    });


UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id
    return user;
}
//Create a new model of user
const User = model('User', UserSchema);
//Export the model
module.exports =  User ;