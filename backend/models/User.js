import { Schema, model } from 'mongoose';

const CharacteristicSchema = new Schema({
    strength:    { type: Number, default: 8 },
    dexterity:   { type: Number, default: 8 },
    constitution:{ type: Number, default: 8 },
    intelligence:{ type: Number, default: 8 },
    wisdom:      { type: Number, default: 8 },
    charisma:    { type: Number, default: 8 },
}, { _id: false });

const UserSchema = new Schema({
    username:  { type: String, unique: true, required: true, trim: true },
    password:  { type: String, required: true },

    roles:     [{ type: String, ref: 'Role', default: 'USER' }],

    name:       { type: String, default: '' },
    race:       { type: Number, default: 1 },
    subRace:    { type: Number, default: 1 },
    class:      { type: Number, default: 1 },
    subClass:   { type: Number, default: 1 },
    background: { type: Number, default: 1 },

    characteristic: { type: CharacteristicSchema, default: () => ({}) },

    skill: { type: [String], default: [] },

});

export default model('User', UserSchema);
