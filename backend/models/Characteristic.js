import { Schema, model } from 'mongoose';

const CharacteristicItemSchema = new Schema({
    characteristicId: Number,
    title: String,
    strengthRecommendValue: Number,
    dexterityRecommendValue: Number,
    constitutionRecommendValue: Number,
    intelligenceRecommendValue: Number,
    wisdomRecommendValue: Number,
    charismaRecommendValue: Number,
}, { _id: false })

const CharacteristicSchema = new Schema({
    recommendedClassId: Number,
    characteristics: { type: [CharacteristicItemSchema], default: [] }
});

export default model('Characteristic', CharacteristicSchema);