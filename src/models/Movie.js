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
     required: [true, 'imageUrl is required'] 
    
    },
  rating: { 
    type: Number, 
    required: [true, 'rating is required'] 

},
  description: { 
    type: String, 
    required: [true, 'description is required'],
    maxLength: [100, 'Description is too long!']

},
});

const Movie = model("Movie", MovieSchema);

export default Movie;
