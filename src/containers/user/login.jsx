import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom';

import {loginOneCoach} from '../../api/coach'
import { useDispatch } from "react-redux";
import { connectCoach } from "../../slices/coachSlice";
import { loadCoachLessons } from "../../slices/lessonSlice";
import {getLessonsFromCoach } from "../../api/lesson"

const Login = (props)=>{
    
    const dispatch = useDispatch()
    
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const onSubmitForm = ()=>{
        setError(null)
        
        let datas ={
            email: email,
            password: password
        }
        
        loginOneCoach(datas)
        .then((res)=>{
            if(res.status === 404){
                setError("Email innexistant!")
            } else if(res.status === 401){
                setError("Mot de passe incorrect!")
            } else {
                window.localStorage.setItem("coachme-token", res.token)
                let myCoach = res.coach
                myCoach.token = res.token
                dispatch(connectCoach(myCoach))
                
                getLessonsFromCoach(res.coach.id)
                .then((response)=>{
                    //mettre à jour store
                    console.log(response)
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }
    
    if(redirect){
        return <Navigate to="/" />
    }
    return (
        <div>
            <h1>Se connecter</h1>
            {error !== false && <p>{error}</p>}
            <form
            	className="c-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm();
                }}
            >
    			<input 
    				type="text" 
    				placeholder="Votre Mail"
    				onChange={(e)=>{
    					setEmail(e.currentTarget.value)
    				}}
    			/>
				<input 
					type="password" 
					placeholder="Votre Mot de passe"
					onChange={(e)=>{
						setPassword(e.currentTarget.value)
					}}
				/>
			
				<input type="submit" name="Enregister"/>
	       </form>
        </div>
    )
    
}
export default Login
