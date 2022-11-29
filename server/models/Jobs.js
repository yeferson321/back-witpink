import { Schema, model } from "mongoose";

/* Creating a schema for the database. */

const usersSchema = new Schema({
    empresa: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    ocupacion: {
        type: String,
        required: true
    },
    descripcion: {
        type: Number,
        required: true,
        lowercase: true,
        trim: true
    },
    interes: {
        type: String,
        required: true
    },
    sueldo: {
        type: Object,
        required: true
    },
    businessid: { 
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'User',
        index: true,
        unique: true
    }
},{
    timestamps: false,
    versionKey: false
});

export default model("Jobs", usersSchema)