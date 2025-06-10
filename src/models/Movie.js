import { Schema, model, Types } from 'mongoose';

const maxYearAllowed = new Date().getFullYear() + 5;
const validCharacterPattern = /^[a-zA-Z0-9]+$/
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required!'],
        validate: [validCharacterPattern, 'Only in English letters, digits and whitespace are allowed!'],
        minLength: [5, 'Title should be at least 5 characters long'],
    },
    category: {
        type: String,
        required: [true, 'category is required!'],
        enum: {
            values: ['tv-show', 'animation', 'movie', 'documentary', 'short-fiml'],
            message: (props) => `${props.value} is not valid category!`
        }
    },
    genre: {
        type: String,
        required: [true, 'genre is required!'],
        lowercase: true, 
        validate: [validCharacterPattern, 'Only in English letters, digits and whitespace are allowed!'],
        minLength: [5, 'Genre should be at least 5 characters long'],
    },
    director: {
        type: String,
        required: [true, 'director is required!'],
        validate: [validCharacterPattern, 'Only in English letters, digits and whitespace are allowed!'],
        minLength: [5, 'Director should be at least 5 characters long'],
    },
    year: {
        type: Number,
        required: [true, 'year is required!'],
        min: [1900, 'Movie cannot be less than 1900 year' ],
        max: [maxYearAllowed, `Year cannot be larger than ${maxYearAllowed}`],
    },
    imageUrl: {
        type: String,
        required: [true, 'imageUrl is required!'],
        validate: [/^https?:\/\//, 'Invalid Image URL!'],
    },
    rating: {
        type: Number,
        required: [true, 'rating is required!'],
        min: [1, 'Rating should be equal or more than 1'],
        max: [10, 'Rating should be equal or less than 10'],
    },
    description: {
        type: String,
        required: [true, 'description is required!'],
        maxLength: [1000, 'Description is too long!'],
        minLength: [20, 'Description is too short'],
        validate: [validCharacterPattern, 'Only in English letters, digits and whitespace are allowed!'],
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast',
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;

