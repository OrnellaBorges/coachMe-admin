import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    infos: {},
    isLogged: false
}

export const coachSlice = createSlice({
    name: "coach",
    initialState,
    reducers: {
        connectCoach: (state, action) =>{
            state.infos = action.payload
            state.isLogged = true
        },
        logoutCoach: (state) => {
            state.infos = {}
            state.isLogged = false
        }
    }
})

export const {connectCoach, logoutCoach} = coachSlice.actions
export const selectCoach = state => state.coach
export default coachSlice.reducer