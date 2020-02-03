"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Define the database schema for entity 'To-Do'.
 * ATTENTION: Must be compatible to the Spring Mongo document.
 */
const toDoSchema = new Schema({
        title: {
            type: String,
            minlength: 2,
            maxlength: 30,
            required: 'Enter a title'
        },
        description: {
            type: String,
            minlength: 10,
            maxlength: 50
        }
    },
    {
        collection: 'toDos'
    }
);

/*
 * We need a field called 'id' to be compatible with Spring Mongo document.
 * Make it virtual so this field is not persisted.
 */
toDoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

/*
 * Activate the usage of virtual fields if toJSON method is called.
 */
toDoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('ToDo', toDoSchema);