import { Schema, model } from "mongoose";

/* Creating a schema for the database. */

// Model.deleteMany()
// Model.deleteOne()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndRemove()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    prefijo: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    ocupacion: {
        type: String,
        required: true
    },
    conocimientos: {
        type: Object,
        required: true
    },
    habilidades: {
        type: Object,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    idiomas: {
        type: Object,
        required: true
    },
    interes: {
        type: String,
        required: true
    },
    presentacion: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    userid: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        index: true,
        unique: true
    }
},{
    timestamps: false,
    versionKey: false
});

export default model("Uservc", usersSchema)