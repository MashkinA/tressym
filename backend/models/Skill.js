import { Schema, model } from 'mongoose';

const SkillSchema = new Schema({
    recommendedClassId: Number,
    amount: Number,
    skills: [String]
});

export default model('Skill', SkillSchema);