import { Schema, model } from "mongoose";

/* Creating a schema for the database. */

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        trim: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    userid: { 
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

export default model("Businesscv", usersSchema)