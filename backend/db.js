const mysql = require("mysql2/promise")

const client = mysql.createPool(process.env.CONNECTION_STRING)

//Get all
async function selectCustumers() {
    const results = await client.query("SELECT * FROM clientes;");
    return results[0];
}
//Select
async function selectCustumer(id) {
    const results = await client.query("SELECT * FROM clientes WHERE id=?", [id]);
    return results[0];
}
//Insert
async function insertCustumer(custumer) {
    const values = [custumer.nome, custumer.idade, custumer.uf]
    await client.query("INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?)", values)
}
//Update
async function updateCustumer(id, custumer){
    const values = [custumer.nome, custumer.idade, custumer.uf, id]
    await client.query("UPDATE clientes SET nome=?,idade=?,uf=? WHERE id=?", values)
}
//Delete
async function deleteCustumer(id){
    const values = [id]
    await client.query("DELETE FROM clientes WHERE id=?", values)
}

module.exports = {
    selectCustumers,
    selectCustumer,
    insertCustumer,
    updateCustumer,
    deleteCustumer
}

