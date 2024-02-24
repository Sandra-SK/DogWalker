const fs = require('fs');

module.exports = (app, db) => {
    //route de récupération de toutes les annonces
    app.get('/api/v1/ads', async (req, res, next) => {
        let adsBDD = await db.query('SELECT * FROM ads')

        if (adsBDD.code) {
            res.json({ status: 500, error_msg: adsBDD })
        }
        res.json({ status: 200, results: { ads: adsBDD } })
    })

    //route de récupération d'une seule annonce (par son id)
    app.get('/api/v1/ads/:id', async (req, res, next) => {
        let id = req.params.id
        let addBDD = await db.query('SELECT * FROM ads WHERE Id = ?', [id])
        if (addBDD.code) {
            res.json({ status: 500, error_msg: addBDD })
        }
        res.json({ status: 200, results: { ad: addBDD[0] } })
    })

    //route de sauvegarde d'une annonce 
    app.post('/api/v1/ads/save', async (req, res, next) => {
        let ajout = await db.query('INSERT INTO ads (Title, Contents, Url, CreationTimesTamp) VALUES (?, ?, ?, NOW())', [req.body.Title, req.body.Contents, req.body.Url])
        if (ajout.code) {
            res.json({ status: 500, error_msg: ajout })
        }
        res.json({ status: 200, result: "Annonce enregistrée!" })
    })

    //route d'ajout d'une image dans l'api (stock une image et retourne au front le nom de l'image stocké)
    app.post('/api/v1/ads/pict', (req, res, next) => {
        console.log(req.files.image);
        //si on a pas envoyé de req.files via le front ou que cet objet ne possède aucune propriété
        if (!req.files || Object.keys(req.files).length === 0) {
            //on envoi une réponse d'erreur
            res.json({ status: 400, msg: "La photo n'a pas pu être récupéré" })
        }
        //la fonction mv va envoyer l'image dans le dossier que l'on souhaite.
        req.files.image.mv('public/images/' + req.files.image.name, (err) => {
            //si ça plante dans la callback
            if (err) {
                res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée", erro: err })
            }
        })
        //si c'est ok, on retourne un json avec le nom de la photo vers le front
        res.json({ status: 200, msg: "image bien enregistré!", url: req.files.image.name })
    })

    //route de modification d'une annonce
    app.put('/api/v1/ads/update/:id', async (req, res, next) => {
        let id = req.params.id
        let modif = await db.query('UPDATE ads SET Title=?, Contents=?, Url=? WHERE Id = ?', [req.body.Title, req.body.Contents, req.body.Url, id])
        if (modif.code) {
            res.json({ status: 500, error_msg: modif })
        }
        res.json({ status: 200, msg: "Modification de l'annonce réussie!" })
    })

    //route de suppression d'une annonce
    app.delete('/api/v1/ads/delete/:id', async (req, res, next) => {
        let id = req.params.id

        let addBDD = await db.query('SELECT * FROM ads WHERE Id = ?', [id])
        if (addBDD.code) {
            res.json({ status: 500, error_msg: addBDD })
        } else {
            let supp = await db.query('DELETE FROM ads WHERE Id = ?', [id])
            if (supp.code) {
                res.json({ status: 500, error_msg: supp })
            }
            //suppression de l'image correspondant à l'article
            if (addBDD[0].Url !== "no-pict.webp") {
                //supprime le fichier (photo) correspondant au nom de la photo enregistrée pour le produit dans la bdd, il supprime la photo dans le dossier static ou son stockées les images
                fs.unlink(`public/images/${addBDD[0].url}`, (err) => {
                    if (err) {
                        res.json({ status: 500, msg: "l'article est supprimé mais pas l'image!", err: err })
                    } else {
                        res.json({ status: 200, msg: "Annonce supprimée avec succès!" })
                    }
                })
            } else {
                res.json({ status: 200, msg: "Annonce supprimée avec succès!" })
            }
        }
    })




}