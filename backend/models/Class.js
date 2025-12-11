import { Schema, model } from 'mongoose';

const ClassSchema = new Schema({
    classId: Number,
    title: String,
    image: String,
    description: String,
    detailedInfo: String,
    hits: String,
    spellcasting: String,
    spellchar: String,
    saveThrow: [String],
    skills: [{ title: String, description: [String] }]
});

export default model('Class', ClassSchema);