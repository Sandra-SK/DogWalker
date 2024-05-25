import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {loadAds} from '../api/ads'
import {config} from '../config'

const Home = (props) =>{
    
    const [ads, setAds] = useState([])
    
    useEffect(()=>{
        loadAds()
        .then((res)=>{
            setAds(res.results.ads)
        })
        .catch(err=>console.log(err))
    },[])
    
    return (
        <section>
            <h1>Fais promener ton chien!</h1>
            {ads.length > 0 && <ul>
                {ads.map((ad)=>{
                    return (<li key={ad.Id}>
                        <img src={config.pict_url+ad.Url} alt="_wing_annonce_" />
                        <Link to={`/detail/${ad.Id}`}>{ad.Title}</Link>
                    </li>)
                })}
            </ul>}
        </section>
    )
}

export default Home