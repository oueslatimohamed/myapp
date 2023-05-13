import mongoose from "mongoose";
const { Schema, model} = mongoose;
const filmSchema =  new Schema(
    {
        typeDeTournage :{
            type: String,
            required: true            
        },
        titre :{
            type: String,
            required: true            
        },
    },
    {
        timestamps: true
    }
);



export default model('Film',filmSchema);