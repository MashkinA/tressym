import { Schema, model } from 'mongoose';

const CharacteristicSchema = new Schema({
    strength:    { type: Number, default: 0 },
    dexterity:   { type: Number, default: 0 },
    constitution:{ type: Number, default: 0 },
    intelligence:{ type: Number, default: 0 },
    wisdom:      { type: Number, default: 0 },
    charisma:    { type: Number, default: 0 },
}, { _id: false });

const UserSchema = new Schema({
    username:  { type: String, unique: true, required: true, trim: true },
    password:  { type: String, required: true },

    roles:     [{ type: String, ref: 'Role', default: 'USER' }],

    name:       { type: String, default: '' },
    race:       { type: Number, default: 0 },
    subRace:    { type: Number, default: 0 },
    class:      { type: Number, default: 0 },
    subClass:   { type: Number, default: 0 },
    background: { type: Number, default: 0 },

    characteristic: { type: CharacteristicSchema, default: () => ({}) },

    skill: { type: [String], default: [] },

});

export default model('User', UserSchema);
