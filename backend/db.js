const mysql = require("mysql2/promise")
const client = mysql.createPool(process.env.CONNECTION_STRING)

//Login
async function userLogin(user, password){
    const values = [user, password]
    const results = await client.query('SELECT * FROM accounts WHERE username = ? AND password = ?', values)
    return results[0];
}

//Get all
async function selectUsers() {
    const results = await client.query("SELECT * FROM users_data;");
    return results[0];
}
//Select
async function selectUser(id) {
    const results = await client.query("SELECT * FROM users_data WHERE id=?", [id]);
    return results[0];
}
//Insert
async function insertUser(custumer) {
    const values = [custumer.nome, custumer.idade, custumer.uf]
    await client.query("INSERT INTO users_data(nome,idade,uf) VALUES (?,?,?)", values)
}
//Update
async function updateUser(id, custumer){
    const values = [custumer.nome, custumer.idade, custumer.uf, id]
    await client.query("UPDATE users_data SET nome=?,idade=?,uf=? WHERE id=?", values)
}
//Delete
async function deleteUser(id){
    const values = [id]
    await client.query("DELETE FROM users_data WHERE id=?", values)
}

module.exports = {
    selectUsers,
    selectUser,
    insertUser,
    updateUser,
    deleteUser,
    userLogin
}

