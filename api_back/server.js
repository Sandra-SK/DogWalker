
const express = require('express')
const app = express()
const mysql = require('promise-mysql')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const config = require("./config")


// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//création du dossier racine ou l'on va stocker toutes les images
app.use(fileUpload({
    createParentPath: true
}))

// Middleware pour le traitement des requêtes JSON et URL-encoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware pour autoriser les requêtes CORS
app.use(cors());

// Middleware pour servir les fichiers statiques
app.use(express.static(__dirname + '/public'));



//connexion bdd
const host = process.env.HOST_DB || config.db.host
const database = process.env.DATABASE_DB || config.db.database
const user = process.env.USER_DB || config.db.user
const password = process.env.PASSWORD || config.db.password

//importation routes
const adsRoutes = require('./routes/adsRoutes')


mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
    
}).then((db)=>{
    console.log(`bdd ${database} connectée`)
    setInterval(async ()=>{
        let res = await db.query('SELECT 1')
    }, 10000)
    
    app.get('/', async (req, res, next)=>{
        res.json({status: 200, msg: "Hello, bienvenue sur le projet DogWalker"})
    })
    
    //appel des routes

    adsRoutes(app, db)
})
.catch(err=>console.log(err))


const PORT = process.env.PORT || 9500

app.listen(PORT, ()=>{
    console.log(`Serveur en écoute sur le port ${PORT}. All is ok !`)
})


