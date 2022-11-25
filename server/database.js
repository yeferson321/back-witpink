import { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

/**
 * The function is called conectMongo, it's an async function, it's going to try to connect to the
 * database, if it can't connect it's going to throw an error.
 */
const conectMongo = async () => {
    try {
        const db = await connect(process.env.MONGO_URT);
        console.log("webpack compiled successfully")
        console.log("Db connected to", db.connection.name)
    } catch (error) {
        console.log(error);
    }
}

export default conectMongo
