import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {loadAds, deleteOneAds} from '../api/ads'

const Admin = (props) =>{
    
    const [ads, setAds] = useState([])
    
    const recup =()=>{
        loadAds()
        .then((res)=>{
            setAds(res.results.ads)
        })
        .catch(err=>console.log(err))
    }
    
    const onClickDelete = (id) => {
        deleteOneAds(id)
        .then((res)=>{
            //on recharge les annonces qui viennent d'être mises à jour
            recup()
        })
        .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        recup()
    },[])
    
    return (
        <section className="admin">
            <h1>Administration</h1>
            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Action</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.length > 0 && ads.map((ad)=>{
                        return (<tr key={ad.Id}>
                            <td>{ad.Title}</td>
                            <td>
                                <Link to={`/edit/${ad.Id}`}>modifier</Link>
                            </td>
                            <td>
                                <button
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        onClickDelete(ad.Id)
                                    }}
                                >
                                    supprimer
                                </button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default Admin