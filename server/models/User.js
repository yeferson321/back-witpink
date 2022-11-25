import { Schema, model } from "mongoose";

/* Creating a schema for the database. */
const usersSchema = new Schema({
    userid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    provider: {
        type: String,
        required: true
    },
    accounttype: {
        type: String,
        required: false
    }
},{
    timestamps: false,
    versionKey: false
});

export default model("User", usersSchema)