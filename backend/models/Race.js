import { Schema, model } from 'mongoose';

const SubcomponentsSchema = new Schema({
    subRaceId: Number,
    title: String,
    size: String,
    speed: Number,
    chars: [{ value: Number, title: String }],
    description: String,
    abilities: [{ title: String, description: String }]
})

const RaceSchema = new Schema({
    raceId: Number,
    title: String,
    image: String,
    subcomponents: { type: [SubcomponentsSchema], default: [] }
});

export default model('Race', RaceSchema);