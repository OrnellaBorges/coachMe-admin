import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectCoach } from "../slices/coachSlice";



//Gestion de la naivgation
const Header = (props)=>{
    const coach = useSelector(selectCoach)
    return (
		<div className="header-nav">
			<nav>
				<div className="list">
				{coach.isLogged ? <div>
					<Link to="/">Admin</Link>
					<Link to="/profil">Profil</Link>
					<Link to="/logout">Se déconnecter</Link>
				</div> : <div>
					<Link to="/register">S'enregistrer</Link>
					<Link to="/login">Se connecter</Link>
				</div>}
				</div>
			</nav>
		</div>
	)
}

export default Header;

		