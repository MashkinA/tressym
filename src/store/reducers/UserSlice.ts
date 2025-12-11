import {createSlice, type PayloadAction} from "@reduxjs/toolkit";


type userState = {
    raceId: number;
    subRaceId: number;
    classId: number;
    backgroundId: number;
}

const initialState: userState = {
    raceId: 1,
    subRaceId: 1,
    classId: 1,
    backgroundId: 1
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRace: (state, action: PayloadAction<number>) => {
            state.raceId = action.payload;
        },

        setSubRace: (state, action: PayloadAction<number>) => {
            state.subRaceId = action.payload;
        },

        setClass: (state, action: PayloadAction<number>) => {
            state.classId = action.payload;
        },

        setBackground: (state, action: PayloadAction<number>) => {
            state.backgroundId = action.payload;
        },
    }
})

export default userSlice.reducer