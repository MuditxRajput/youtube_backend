import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim: true,
        index : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim: true,
    },
    fullname :{
        type : String,
        required : true,
        trim: true,
        index : true,
    },
    avatar:{
        type : String, // cloudinary services
        required : true,
    },
    coverImage : {
        type : String,
    },
    watchHistory :[
        {
            type : Schema.Types.ObjectId,
            ref : "Videos"
        }
    ],
    password : {
        type : String,
        required : [true,'Password is required']
    },
    refreshToken:{
        types: SVGStringList,
    }

},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.refreshAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname
        }, 
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const Users = mongoose.model("Users",userSchema);