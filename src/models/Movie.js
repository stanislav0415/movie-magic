import { Schema, model } from "mongoose";

const maxYearAllowed = new Data().getFullYear() + 5
const MovieSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'title is required'] 

},
  category: { 
    type: String, 
    required: [true, 'category is required'] 
},
  genre: { 
    type: String, 
    required: [true, 'genre is required'] 
},
  director: { 
    type: String, 
    required: [true, 'director is required'] 
},
  year: { 
    type: Number, 
    required: true,
    min: 1970,
    max: [maxYearAllowed,`Year can not be larger ${maxYearAllowed}`]

 },
  imageUrl: {
     type: String,
     required: [true, 'imageUrl is required'],
     validate:[ /^https?:\/\//, 'invalid image url'
     ]
    
    },
  rating: { 
    type: Number, 
    required: [true, 'rating is required'] ,
    min:[1, 'Rating should be equal or more than 1'],
    max:[10,'Rating should be equal or less than 10'],

},
  description: { 
    type: String, 
    required: [true, 'description is required'],
    maxLength: [100, 'Description is too long!']

},
});

const Movie = model("Movie", MovieSchema);

export default Movie;
