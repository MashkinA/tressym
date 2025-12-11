import { Schema, model } from 'mongoose';

const BackgroundSchema = new Schema({
    backgroundId: Number,
    title: String,
    image: String,
    description: String,
    detailedInfo: String,
    skill: String,
    attainments: [String],
    instruments: [String],
    equipment: [String]
});

export default model('Background', BackgroundSchema);