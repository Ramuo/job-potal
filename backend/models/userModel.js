import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from "validator";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name!"],
        minLength: [3, "Name must contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    phone: {
        type: Number,
        required: [true, "Please enter your Phone Number!"],
    },
    password: {
        type: String,
        required: [true, "Please provide a Password!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        maxLength: [32, "Password cannot exceed 32 characters!"],
    },
    role: {
        type: String,
        // required: [true, "Please select a role"],
        enum: ["Applicant", "Employer"],
        default: 'Applicant'
    },
    },
    { timestamps: true }
);

//TO AUTHENTICATE USER PSW
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//TO CRYPT PSW
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    };

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;