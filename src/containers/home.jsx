import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectCoach } from "../slices/coachSlice";
import { selectLessons } from "../slices/lessonSlice";
import moment from 'moment';
import Calendar from '../components/calendar';
import AddLesson from '../components/addLesson';

const Home = (props) =>{
    
    const coach = useSelector(selectCoach)
    const lessons = useSelector(selectLessons)
    
    const [myLessons, setMyLessons] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const [isPopUp, setIsPopUp] = useState(false);  

    
    const onClickChangeLessons = (type)=>{
        //condition switch sur l'argument type passé lors du click d'un des trois bouttons
        switch(type){
            case "all":
                setMyLessons(lessons.allLessons)
            break;
            case "futur":
                setMyLessons(lessons.futurLessons)
            break;
            case "old":
                setMyLessons(lessons.oldLessons)
            break;
            default:
                setMyLessons(lessons.allLessons)
            break;
        }
        //selon le cas on met à jour la state myLesson par une des trois propriété de notre state globale du store (ce qui fait que ça mettra automatiquement notre jsx à jour)
        
    }
    
    useEffect(()=>{
        setMyLessons(lessons.allLessons)
    }, [])
    
    return (
        <main>
            <h1>Dashboard</h1>
            <div>
                <button
                    onClick={(e)=>{
                        setIsPopUp(true)
                    }}
                >
                    Ajouter un cours
                </button>
            </div>
            <div>
                <button
                    onClick={(e)=>{
                       onClickChangeLessons("all")
                    }}
                >
                    Toutes
                </button>
                <button
                    onClick={(e)=>{
                       onClickChangeLessons("futur")
                    }}
                >
                    à venir
                </button>
                <button
                    onClick={(e)=>{
                       onClickChangeLessons("old")
                    }}
                >
                    Passées
                </button>
            </div>
            {isPopUp && <AddLesson
                onClose={()=>{
                    setIsPopUp(false)
                }}
            />}
            {myLessons.length > 0 && <Calendar lessons={myLessons} isModify={isModify}/>}
        </main>
    )
}

export default Home