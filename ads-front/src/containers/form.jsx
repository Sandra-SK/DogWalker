import React, { useState } from 'react';
import FormAds from '../components/formAds';
import { Navigate } from 'react-router-dom';
import { addOneAds } from '../api/ads';
import axios from 'axios';
import { config } from '../config';

const Form = (props) => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [selectedFile, setFile] = useState(null);

    const saveAd = (datas) =>{
        //appel de la fonction d'axios qui enregistre une annonce
        addOneAds(datas)
        .then((res)=>{
            if(res.status === 200){
                setRedirect(true)
            } else {
                console.log("Echec envoi",res)
            }
        })
        .catch(err=>console.log(err))
    }
    

    const handleSubmit = () => {
        if (selectedFile === null) {
            let datas = {
                Title: title,
                Contents: contents,
                Url: 'no-pict.webp'
            };
            saveAd(datas);
        } else {
            let formData = new FormData();
            formData.append('image', selectedFile);
            axios({
                method: 'post',
                url: config.api_url + '/api/v1/ads/pict',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.data.status === 200) {
                        let datas = {
                            Title: title,
                            Contents: contents,
                            Url: res.data.url
                        };
                        saveAd(datas);
                    } else {
                        console.log('ERREUR', res);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    if (redirect) {
        return <Navigate to="/" />;
    }
    return (
        <section>
            <h1>Ajouter une annonce</h1>
            <FormAds
                title={title}
                contents={contents}
                onChangeTitle={(txt) => {
                    setTitle(txt);
                }}
                onChangeContents={(txt) => {
                    setContents(txt);
                }}
                onChangeFile={(file) => {
                    setFile(file);
                }}
                handleSubmit={handleSubmit}
            />
        </section>
    );
};

export default Form;
