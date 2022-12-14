import { Schema, model } from "mongoose";

/* Creating a schema for the database. */

const usersSchema = new Schema({
    tiempo: {
        type: String,
        required: true,
    },
    empresa: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    salario: {
        type: Number,
        required: true,
        lowercase: true,
        trim: true
    },
    habilidades: {
        type: Object,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    jobsid: { 
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    }
},{
    timestamps: false,
    versionKey: false
});

export default model("Jobs", usersSchema)