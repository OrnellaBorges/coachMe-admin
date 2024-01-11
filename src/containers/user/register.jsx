import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom';
import {sports} from '../../helpers/sport'
import {saveOneCoach} from '../../api/coach'
import axios from 'axios'

const Register = (props)=>{
    
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [sport, setSport] = useState("")
    const [tjm, setTjm] = useState("")
    
    const onSubmitForm = ()=>{
        setError(null)
        //on récupère les coordonnées de position du coach
        axios.get(`https://nominatim.openstreetmap.org/search?q=${address} ${zip} ${city}&format=geocodejson`)
        .then((res)=>{
            let location = res.data.features[0].geometry.coordinates
            let lat = location[1]
            let lng = location[0]
            
            let datas = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                description: description,
                sport: sport,
                address: address,
                zip: zip,
                city: city,
                lat: lat,
                lng: lng,
                tjm: tjm
            }
            
            saveOneCoach(datas)
            .then((response)=>{
                setRedirect(true)
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }
    
    if(redirect){
        return <Navigate to="/login"/>
    }
    return (
        <div>
            <h1>S'enregister</h1>
            {error !== null && <p>{error}</p>}
            
            <form
            	className="c-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm();
                }}
	        >
                <input 
    				type="text" 
    				placeholder="Votre Prénom"
    				onChange={(e)=>{
    					setFirstName(e.currentTarget.value)
    				}}
    			/>
				<input 
					type="text" 
					placeholder="Votre Nom"
					onChange={(e)=>{
						setLastName(e.currentTarget.value)
					}}
				/>
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
				<textarea
					type="decription" 
					placeholder="Décrivez vous !"
					onChange={(e)=>{
					    setDescription(e.currentTarget.value)
					}}
				>		

				</textarea>
				<input 
					type="text" 
					placeholder="Votre Adresse"
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Code postal"
					onChange={(e)=>{
						setZip(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Ville"
					onChange={(e)=>{
						setCity(e.currentTarget.value)
					}}
				/>
				<select
					onChange={(e)=>{
						setSport(e.currentTarget.value)
					}}
				>
					{
						sports.map((sport, index)=>{
							return (<option key={index} value={sport}>
										{sport}
									</option>)
						})
					}
				</select>
				<input 
					type="text" 
					placeholder="Votre Tarif Horaire"
					onChange={(e)=>{
						setTjm(e.currentTarget.value)
					}}
				/>
				<input type="submit" name="Enregister"/>
	        </form>
        </div>
    )
}

export default Register