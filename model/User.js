import mongoose from "mongoose";

const reviewchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const ResumeSchema = new mongoose.Schema({
    filename: { type: String },
    mimetype: { type: String },
    data: { type: Buffer },  // 🔹 store the actual file data here
    text: { type: String }   // optional extracted text
}, { _id: false });


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isAcceptingreview: {
        type: Boolean,
        default: true
    },
    review: [reviewchema],
    resume: ResumeSchema,
    jobDescription:{
        type:String
    },
    reviewRequirements:{
        type:String
    }

}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;