import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'FirstName is required.'],
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    LastName: {
        type: String,
        required: [true, 'LastName is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Please provide a valid email address.',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: 8,
    },
    profileImage: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(14);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
