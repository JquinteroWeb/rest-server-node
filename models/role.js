const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Role is required'],
    }
});

const Role = model('Role', RoleSchema);
module.exports =  Role ;