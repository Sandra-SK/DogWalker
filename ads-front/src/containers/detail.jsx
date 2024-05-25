import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {loadOneAds} from '../api/ads'
import {config} from '../config'

const Detail = (props) =>{
    const params = useParams()
    
    const [ad, setAd] = useState(null)
    
    useEffect(()=>{
        loadOneAds(params.id)
        .then((res)=>{
            console.log(res)
            setAd(res.results.ad)
        })
        .catch(err=>console.log(err))
    }, [params.id])
    
    return (
        <section>
            <Link to="/">Retour à l'accueil</Link>
            <h1>Détails de l'annonce</h1>
            {ad !== null && <article>
                <img src={config.pict_url+(ad.Url || '')}alt ="wing de l'annonce" />
                <h2>Titre: {ad.Title}</h2>
                <p>Description: {ad.Contents}</p>
            </article>}
        </section>
    )
}

export default Detail