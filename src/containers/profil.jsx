import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {sports} from '../helpers/sport';
import {changeImg} from '../api/coach'
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCoach, connectCoach } from "../slices/coachSlice";
import {getOneCoach, updateCoach} from '../api/coach'
import axios from 'axios'

const Profil = (props)=>{
    
    const coach = useSelector(selectCoach)
    const dispatch = useDispatch()
    
    const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [description, setDescription] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZip] = useState('');
	const [city, setCity] = useState('');
	const [sport, setSport] = useState('');
	const [tjm, setTjm] = useState('');
	
    const [redirect, setRedirect] = useState(false);
	const [msg, setMsg] = useState(null);
	const [img, setImg] = useState(null)
	
	useEffect(()=>{
		setFirstName(coach.infos.firstName);
        setLastName(coach.infos.lastName);
        setDescription(coach.infos.description);
        setAddress(coach.infos.address);
        setZip(coach.infos.zip);
        setCity(coach.infos.city);
        setSport(coach.infos.sport)
        setTjm(coach.infos.tjm)
        setImg(coach.infos.img)
	}, [coach])
	
	//fonction callback de cloudinary déclenché lors de l'envoi un fichier
	const checkUploadResult = (resultEvent) => {
	    setMsg(null)
	    //si l'envoi est réussit
        if (resultEvent.event === "success") {
            console.log("RESULT", resultEvent);

	        console.log("result info", resultEvent.info);
	        
	        let datas = {
	            imageUrl: resultEvent.info.public_id,
	            id: coach.infos.id
	        }
	        
	        changeImg(datas)
	        .then((res)=>{
	            if(res.status === 200){
	                getOneCoach(coach.infos.id)
	                .then((response)=>{
	                	console.log("getOneCoach", response)
	                    let myCoach = response.result
	                    console.log(myCoach)
	                    myCoach.token = localStorage.getItem("coachme-token")
	                    dispatch(connectCoach(myCoach))
	                    setImg(response.result.imageUrl)
	                })
	                
	                setMsg('Votre profil a bien été édité');
	            }else{
	                setMsg("L'image n'a pas été modifié");
	            }
	        })
	        .catch(err=>console.log("Echec modification image!"))
        }else{
            console.log("Erreur envoi fichier")
        }
	}
	
	//fonction d'affichage de notre interface de chargement d'images/videos de cloudinary
	const showWidget = () => {
	    //paramètrage de l'interface
	    let widget = window.cloudinary.createUploadWidget(
	      {
	        cloudName: "dt6k2cynj",//nom de mon cloud
	        uploadPreset: "coachme",//dossier ou l'on veut envoyer
	        maxImageWidth: 800,//on peut paramètrer la taille max de l'image
	        cropping: false,//recadrage
	      },
	      (error, result) => {
	        //console.log(error);
	        //console.log(result);
	        checkUploadResult(result);//appel de notre callback
	      }
	    );
	    //ouverture de notre interface
	    widget.open();
	}
	

	
	const onSubmitForm = ()=>{
	    axios.get('https://nominatim.openstreetmap.org/search?q='+address+' '+zip+' '+city+'&format=geocodejson')
        .then((res, err)=>{
        	if(res.data.features.length === 0) {
        		setMsg('Votre adresse est mauvaise !');
        	} else {
        		let lat = res.data.features[0].geometry.coordinates[1];
		        let lng = res.data.features[0].geometry.coordinates[0];
		        console.log(lat);
		        console.log(lng);
		        
		        let datas = {
		        	firstName: firstName,
	    			lastName: lastName,
	    			description: description,
	    			sport: sport,
	    			address: address,
	    			city: city,
	    			zip: zip,
	    			lat: lat,
	    			lng: lng,
	    			tjm: tjm
			    }
			    updateCoach(datas, coach.infos.id)
			    .then((res)=>{
			    	if(res.status === 200){
			    		getOneCoach(coach.infos.id)
			    		.then((response)=>{
			    			if(response.status === 200){
				    			let myCoach = response.result
				    			myCoach.token = localStorage.getItem("coachme-token")
				    			dispatch(connectCoach(myCoach))
				    			setMsg("Modification réussie")
			    			}
			    		})
			    		.catch(err=>console.log(err))
			    	}else{
			    		setMsg("Echec modification du coach")
			    	}
			    })
			    .catch(err=>console.log(err))
        	}
        })
	}
	
    return (
        <div>
			<h2>Profil</h2>
			{msg !== null && <p>{msg}</p>}
			
	        <br />
	        <form
            	className="c-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm();
	                }}
	        >	
	            {img !== null && <CloudinaryContext cloudName="dt6k2cynj">
		            <div>
		              <Image publicId={coach.infos.imageUrl} id="profilImg">
		                <Transformation quality="auto" fetchFormat="auto" />
		              </Image>
		            </div>
		         </CloudinaryContext>}
	            
	            <button
    	            onClick={(e) => {
    	              e.preventDefault();
    	              showWidget();
    	            }}
	            >
	                Changer ma photo de profil
	            </button>
	            
	            
	            <input 
					type="text" 
					placeholder="Votre Prénom"
					value={firstName}
					onChange={(e)=>{
						setFirstName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Nom"
					value={lastName}
					onChange={(e)=>{
						setLastName(e.currentTarget.value)
					}}
				/>
				<textarea
					type="decription" 
					placeholder="Décrivez vous !"
					value={description}
					onChange={(e)=>{
						setDescription(e.currentTarget.value)
					}}
				>
				</textarea>
				<input 
					type="text" 
					placeholder="Votre Adresse"
					value={address}
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Code postal"
					value={zip}
					onChange={(e)=>{
						setZip(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Ville"
					value={city}
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
							if(sport === coach.infos.sport) {
								return (<option selected key={index} defaultValue={sport}>
										{sport}
									</option>)
							} else {
								return ( <option key={index} defaultValue={sport}>
										{sport}
									</option>)
							}
						})
					}
				</select>
				<input 
					type="text" 
					placeholder="Votre Tarif Horaire"
					value={tjm}
					onChange={(e)=>{
						setTjm(e.currentTarget.value)
					}}
				/>
	            
	            
	            
	            <input type="submit" name="Enregister"/>
	       </form>
	    </div>
    )
    
}

export default Profil