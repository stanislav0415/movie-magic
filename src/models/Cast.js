import { Schema, model } from 'mongoose'

const validCharacterPattern = /^[a-zA-Z0-9]+$/

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: [validCharacterPattern, 'Only in English letters, digits and whitespace are allowed!'],
        minLength: [5, 'Title should be at least 5 characters long'],
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'Age should be at least 1 years old'],
        max: [120, 'Age should be less than 120 years old'],
    },
    born: { 
        type: String,
        required: true,
         minLength: [10, 'Born should be at least 5 characters long'],
    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//, 'Invalid Image URL!'],
        required: true,
    }
});

const Cast = model('Cast', castSchema);

export default Cast;