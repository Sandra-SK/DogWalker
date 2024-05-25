import React, {useState, useEffect} from 'react'
import {updateOneAds, loadOneAds} from '../api/ads'
import {Navigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {config} from '../config'
import FormAds from '../components/formAds'

const Edit = (props) =>{
    const params = useParams()
    
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [oldImg, setOldImg] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [selectedFile, setFile] = useState(null)
    
    
    const updateAd = (datas) =>{
        //appel de la fonction d'axios qui enregistre une annonce
        updateOneAds(datas, params.id)
        .then((res)=>{
            if(res.status === 200){
                setRedirect(true)
            } else {
                console.log("Echec envoi",res)
            }
        })
        .catch(err=>console.log(err))
    }
    
    const handleSubmit = ()=>{
        
        //si jamais l'utilisateur n'a pas ajouté d'image
        if(selectedFile === oldImg){
            //on crée un objet pour envoyer vers le back (req.body) avec par défaut le nom de l'image no-pict.webp pour les annonces sans images
            let datas = {
                Title: title,
                Contents: contents,
                Url: oldImg
            }
            //envoi des données vers le back (appel fonction)
            updateAd(datas)
        //sinon
        } else {
            //l'utilisateur a envoyé une image dans son annonce
            //on crée un objet formData (permet d'envoyer dans une requète ajax le fichier sous forme d'objet avec ses propriétés)
            let formData = new FormData()
            formData.append('image', selectedFile)
            //requète axios d'envoi d'une image vers le back
            axios({
                method: "post",
                Url: config.api_url+'/api/v1/ads/pict',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                //si la réponse est positive
                if(res.data.status === 200){
                    //on crée un objet pour envoyer vers le back (req.body) avec cette fois-ci pour le nom de l'image le nom retourné dans la réponse de l'ajout d'image
                    let datas = {
                        Title: title,
                        Contents: contents,
                        Url: res.data.Url
                    }
                    //envoi des données vers le back (appel fonction)
                    updateAd(datas)
                } else {
                    console.log("ERREUR", res)
                }
            })
            .catch(err=>console.log(err))
        }  
    }
    
    useEffect(()=>{
        loadOneAds(params.id)
        .then((res)=>{
            setTitle(res.results.ad.Title)
            setContents(res.results.ad.Contents)
            setFile(res.results.ad.Url)
            setOldImg(res.results.ad.Url)
        })
        .catch(err=>console.log(err))
    }, [])
    
    if(redirect){
        return <Navigate to='/admin'/>
    }
    return (
        <section>
            <h1>Modifier une annonce id: {params.id}</h1>
            <FormAds
                Title={title}
                Contents={contents}
                onChangeTitle={(txt)=>{
                    setTitle(txt)
                }}
                onChangeContents={(txt)=>{
                    setContents(txt)
                }}
                onChangeFile={(file)=>{
                    setFile(file)
                }}
                handleSubmit={handleSubmit}
            />
            <img src={config.pict_url+oldImg} />
        </section>
    )
}

export default Edit