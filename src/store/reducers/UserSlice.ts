import {createSlice, type PayloadAction} from "@reduxjs/toolkit";


type RaceState = {
    raceId: number;
    subRaceId: number;
}

const initialState: RaceState = {
    raceId: 1,
    subRaceId: 1
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRace: (state, action: PayloadAction<number>) => {
            state.subRaceId = action.payload;
        }
    }
})

export default userSlice.reducer