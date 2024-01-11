import { createSlice } from "@reduxjs/toolkit";
import moment from "moment"

const initialState = {
    allLessons: [],
    futurLessons: [],
    oldLessons: []
}

export const lessonSlice = createSlice({
    name: "lessons",
    initialState,
    reducers: {
        loadCoachLessons: (state, action)=>{
            state.allLessons = action.payload;
            state.futurLessons = state.allLessons.filter(lessons => moment(lessons.start) > moment())
            state.oldLessons = state.allLessons.filter(lessons => moment(lessons.start) < moment())
        }
    }
    
})

export const {loadCoachLessons} = lessonSlice.actions
export const selectLessons = state => state.lessons
export default lessonSlice.reducer
