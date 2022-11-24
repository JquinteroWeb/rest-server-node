const { Schema, model } = require('mongoose');

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
        },
        status: {
            type: Boolean,
            default: true,
            required: [true, 'Status is required']
        },
        //Relationships in the schema
        user: {
            type: Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
    }
);

categorySchema.methods.toJSON = function () {
    const { __v, _id,status ,  ...category } = this.toObject();
    category.uid = _id
    return category;
}

const Category = model('Category', categorySchema);

module.exports =  Category
