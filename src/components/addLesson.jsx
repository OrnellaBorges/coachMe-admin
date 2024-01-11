import React, {useState, useEffect} from 'react';
import DateTimePicker from 'react-datetime-picker';
import {saveOneLesson, getLessonsFromCoach} from '../api/lesson'
import {loadCoachLessons} from '../slices/lessonSlice'
import { useSelector, useDispatch } from "react-redux";
import {selectCoach} from '../slices/coachSlice'



const AddLesson = (props)=>{
    
    const coach = useSelector(selectCoach)
    const dispatch = useDispatch()
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    
    const onClickSaveLesson = () =>{
        let datas = {
            coach_id: coach.infos.id,
            start: start,
            end: end
        }
        saveOneLesson(datas)
        .then((res)=>{
            if(res.status === 200){
                getLessonsFromCoach(coach.infos.id)
                .then((response)=>{
                    if(response.status === 200){
                        dispatch(loadCoachLessons(response.result))
                        props.onClose()
                    }
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }
    
    return (
		<div className="modal-lesson">
		    <button
				className="redButton"
				onClick={(e)=>{
					props.onClose();
				}}
			>X</button>
			<h3>Ajouter un cours</h3>
			<div>
				<DateTimePicker 
					onChange={(date)=>{
						setStart(date);
					}}
	          		value={start}
				/>
			</div>
			<div>
				<DateTimePicker 
					onChange={(date)=>{
						setEnd(date);
					}}
	          		value={end}
				/>
			</div>
			<button
				onClick={()=>{
					onClickSaveLesson()
				}}
			>Ajouter !</button>
		</div>
	)
}


export default AddLesson