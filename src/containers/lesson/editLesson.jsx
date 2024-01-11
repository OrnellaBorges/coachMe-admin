import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import {Link} from 'react-router-dom';
import {getLessonsFromCoach,deleteOneLesson, updateOneLesson} from '../../api/lesson'
import {loadCoachLessons} from '../../slices/lessonSlice'
import { useSelector, useDispatch } from "react-redux";
import { selectCoach } from "../../slices/coachSlice";
import { selectLessons } from "../../slices/lessonSlice";

//exemple de hook
const EditLesson = (props)=>{
    
    const params = useParams()
    const lessons = useSelector(selectLessons)
    const coach = useSelector(selectCoach)
    const dispatch = useDispatch()
    const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const [msg, setMsg] = useState(null);
	const [lessonIndex, setLessonIndex] = useState(null)
	
	useEffect(() => {
	    //on récupère la lesson concernée avec un findIndex dans la state globale de lessons
	    let index = lessons.allLessons.findIndex((lesson)=>parseInt(lesson.id) === parseInt(params.id))
	    //si il le trouve
	    if(index !== -1){
	        //on met à jour les state start et end et lessonIndex
	    	setStart(new Date(lessons.allLessons[index].start))
	    	setEnd(new Date(lessons.allLessons[index].end))
	    	setLessonIndex(lessons.allLessons[index].id)
	    }
	},[lessons])
	
	const submitEdit = ()=>{
	    
	    let datas = {
	    	start: moment(start),
	    	end: moment(end)
	    }
	    //on met à jour les lessons (fonction api axios)
	    updateOneLesson(datas, lessonIndex)
	    .then((res)=>{
	    	//on ouvbli pas de rechargé les lessons mises à jour (fonction api axios)
	        if(res.status === 200){
	        	getLessonsFromCoach(coach.infos.id)
	        	.then((response)=>{
	        		dispatch(loadCoachLessons(response.result))
	        		setMsg("La modification a bien été effectuée")
	        	})
	        	.catch(err=>console.log(err))
	        }
	            
	    })
	    .catch(err=>console.log(err))
	}
	
	return (
		<div>
			<Link to="/">Retour admin</Link>
			<h2>Editez un cours</h2>
			<div>
				<p>Modification de début</p>
				<DateTimePicker 
					onChange={(date)=>{

						setStart(date)
					}}
	          		value={start}
	          		locale="fr"
				/>
			</div>
			<div>
				<p>Modification de la fin</p>
				<DateTimePicker 
					onChange={(date)=>{
						setEnd(date)
					}}
	          		value={end}
	          		locale="fr"
				/>
			</div>
			<button
				onClick={(e)=>{
					submitEdit();
				}}
			>
				EDITEZ !
			</button>
			{msg !== null && <p>{msg}</p>}
		</div>
	)
}

export default EditLesson