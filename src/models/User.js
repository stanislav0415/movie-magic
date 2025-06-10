import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { validate } from "uuid";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User email is required!'],
        unique: true,
        minLength: [10, 'Email should be at least 10 characters long!'],
        validate: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/ , 'Invalid Email Format!']
    },
    password: {
        type: String,
        required: [true, 'Please provide password!'],
        validate: [/^[a-zA-Z0-9]+$/, 'Password should be at alphanumeric'],
        minLength:[6, 'Password should be at least 6 characters long!']
    },
});



userSchema.pre('save', async function () {
  
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.virtual('rePassword')
.set(function(value){
     if (this.password !== value ) {
        throw new Error('Password Missedmatch!');
        
     }});

    

const User = model('User', userSchema);

export default User;
