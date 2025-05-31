import { Schema, model } from "mongoose";

const MovieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String,

});

const Movie = model('Movie', MovieSchema);

export default Movie

