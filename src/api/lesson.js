import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("coachme-token");

export const saveOneLesson = (datas) => {
    return axios.post(config.api_url+'/api/v1/lesson/save', datas, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateOneLesson = (datas, id) => {
    return axios.put(config.api_url+'/api/v1/lesson/update/'+id, datas, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const deleteOneLesson = (id) => {
    return axios.delete(config.api_url+'/api/v1/lesson/delete/'+id, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
    
}

export const getLessonsFromCoach = (coach_id)=>{
    return axios.get(config.api_url+'/api/v1/lesson/all/'+coach_id)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
    
}