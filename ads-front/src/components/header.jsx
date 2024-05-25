import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCirclePlus, faGears } from '@fortawesome/free-solid-svg-icons'

const Header = (props)=>{
    
    return (
        <header>
            <nav>
                <Link to="/"><FontAwesomeIcon icon={faHome} className="fontawesome"/></Link>
                <Link to="/form"><FontAwesomeIcon icon={faCirclePlus} className="fontawesome"/>Ajouter une annonce</Link>
                <Link to="/admin"><FontAwesomeIcon icon={faGears} className="fontawesome"/>Dashboard</Link>
            </nav>
        </header>
    )
}

export default Header