require("dotenv").config()
const cors = require('cors')
const express = require("express")
const jwt = require("jsonwebtoken")
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECRET

//Import DB.js
const db = require("./db")

//Start Express
const app = express()

//Alow CORS origen
app.use(cors())

//Json to object converter 
app.use(express.json())

//Validador JWT
function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err) return res.json( { message: "Usuário não autorizado" }) //res.sendStatus(403)
        req.userId = decoded.userId
        next();
    } )
}

//Login
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const results = await db.userLogin(username, password)

    if (results.length > 0){
        const token = jwt.sign( {userId: results[0].id}, jwtSecret, {expiresIn: '1d'} )
        res.json({ auth: true, id: results[0].id, token} )
    } else {
        res.json( { message: "Usuário não foi encontrado" }) //res.sendStatus(401);
    }
    
})

//Delete
app.delete("/users_data/:id", verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id)
    await db.deleteUser(id)
    res.json( "deleted" ) // res.sendStatus(204);
})

//Patch
app.patch("/users_data/:id", verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    const custumer = req.body;
    await db.updateUser(id, custumer);
    res.json( "patched" ) //res.sendStatus(200);
})

//Post
app.post("/users_data", verifyJWT, async (req, res) => {
    const custumer = req.body;
    await db.insertUser(custumer);
    res.sendStatus(201);
})

//Get user
app.get("/users_data/:id", verifyJWT, async (req, res) => {    
    const id = parseInt(req.params.id)
    const results = await db.selectUser(id)
    res.json(results)
})

//Get all user
app.get("/users_data", verifyJWT, async (req, res) => {
    const results = await db.selectUsers()
    res.json(results)
})

//Root
app.get("/", verifyJWT, (req, res) => {
    res.json( "Rota raiz -> '/' " )
})

//Server
app.listen(port, () => {
    console.log(`App is running on port -> ${port}`)
})