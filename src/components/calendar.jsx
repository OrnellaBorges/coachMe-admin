import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {getLessonsFromCoach,deleteOneLesson} from '../api/lesson'
import {loadCoachLessons} from '../slices/lessonSlice'
import { useSelector, useDispatch} from "react-redux";
import { selectCoach } from "../slices/coachSlice";
import moment from 'moment';
import localization from 'moment/locale/fr';
moment.updateLocale('fr', localization);


const Calendar = (props)=>{
	
	const coach = useSelector(selectCoach)
	const dispatch = useDispatch()
	
    const [changeTime, setChangeTime] = useState(false);
	const [isPopUp, setIsPopUp] = useState(false);
	
	const onClickDelete = (id)=>{
	    deleteOneLesson(id)
	    .then((res)=>{
	    	if(res.status === 200){
	    		getLessonsFromCoach(coach.infos.id)
	    		.then((response)=>{
	    			dispatch(loadCoachLessons(response.result))
	    		})
	    		.catch(err=>console.log(err))
	    	}
	    })
	    .catch(err=>console.log(err))
	}
	
	return (
		<ul className="calendar-admin">
		{/*Boucle et affichage des lessons (props)*/}
		{props.lessons.map((lesson)=>{
			let isModifable = false
			let name = "not-move"
			if(moment(lesson.start) > moment() && lesson.status === "free"){
				isModifable = true
				name=""
			}
			return (<li key={lesson.id} className={name}>
				<p>{moment(lesson.start).format("L")}</p>
				<p>début: {moment(lesson.start).format("LT")} / fin: {moment(lesson.end).format("LT")}</p>
				<p>statut: {lesson.status === "free" ? "Non validé" : "Validé"}</p>
				{isModifable && <div>
					<Link to={`/edit-lesson/${lesson.id}`}>Modifier</Link>
					<button
						onClick={()=>{
							onClickDelete(lesson.id)
						}}
					>
						Supprimer
					</button>
				</div>}
			</li>)
		})}
		</ul>
	)
}

export default Calendar