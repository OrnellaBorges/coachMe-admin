import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom';

import {loginOneCoach} from '../../api/coach'
import { useDispatch } from "react-redux";
import { logoutCoach } from "../../slices/coachSlice";

const Logout = (props)=>{
    const dispatch = useDispatch()
    
    const [redirect, setRedirect] = useState(false)
    
    useEffect(()=>{
        window.localStorage.removeItem("coachme-token")
        dispatch(logoutCoach())
        setRedirect(true)
    }, [])
    
    if(redirect){
        return <Navigate to="/login" />
    }
    return (
        <div>
            <h1>Se déconnecter</h1>
        </div>
    )
}

export default Logout