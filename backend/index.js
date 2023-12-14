require("dotenv").config()
const express = require("express")

const db = require("./db")

//Start Express
const app = express()

//Json to object converter 
app.use(express.json())

//Delete
app.delete("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    await db.deleteCustumer(id)
    res.sendStatus(204);
})

//Update
app.patch("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const custumer = req.body;
    await db.updateCustumer(id, custumer);
    res.sendStatus(200);
})

//Insert
app.post("/clientes", async (req, res) => {
    const custumer = req.body;
    await db.insertCustumer(custumer);
    res.sendStatus(201);
})

//Select
app.get("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const results = await db.selectCustumer(id)
    res.json(results)
})

//Get all
app.get("/clientes", async (req, res) => {
    const results = await db.selectCustumers()
    res.json(results)
})

//Root
app.get("/", (req, res, next) => {
    res.json( { message: "Rota raiz -> '/' " } )
})

//Server
app.listen(process.env.PORT, () => {
    console.log("App is running!!!")
})