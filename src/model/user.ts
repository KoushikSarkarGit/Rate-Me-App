import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string,
    createdDate: Date
}


const MessageSchema : Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, "content is required"],

    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})



export interface User extends Document{
    username: string,
    password: string,
    email: string,
    verifyCode: string,
    verifyCodeExpiryDate: Date,
    isAcceptingMessage: Boolean,
    isVerified: Boolean,
    messages: Message[],
    createdDate: Date
}


const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "username is required"],

    },
    password: {
        type: String,
        required: [true, "password is required"],

    },
    email: {
        type: String,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "please enter a valid email"],
        unique: true,
        required: [true, "username is required"],

    },
    verifyCode: {
        type: String,
        required: [true, "verifyCode is required"],
    },
    verifyCodeExpiryDate: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      isAcceptingMessage: {
        type: Boolean,
        default: true,
      },
      messages: [MessageSchema],
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Usermodel= (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));
export default Usermodel;