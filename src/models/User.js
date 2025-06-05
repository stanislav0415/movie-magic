import { Schema, model } from "mongoose";

const userShema = new Schema({
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true, 
    },
});

const User = model('User', userShema);

export default User;