import express from "express";
import m from "mongoose";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 80;
const app = express();
const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT,OPTIONS,PATCH",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, x-test",
    "Access-Control-Expose-Headers":
      "X-Resp,Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Expose-Headers",
    "Access-Control-Allow-Headers":
      "X-Resp,Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Expose-Headers"}
const headerTEXT={'Content-Type':"text/html; charset=utf-8", ...CORS}
const schema = new m.Schema({
    login: String,
    password: String
})
let user = m.model('user', schema);

app.use(bodyParser.urlencoded({extended:true})).all('/login/', (req, res) => {
    res.set(headerTEXT).send('artem_wr');;
})
app.all('/', async (req, res) => {
    res.set(headerTEXT);
})

app.all('/insert/', async (req, res) => {
    res.set(headerTEXT);
    const {login, password, URL}=req.body;
    let newUser = new user({
                login,
                password
            });
    try{
        await m.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true});
        try{
            await newUser.save();
            res.status(201).json({'Добавлено: ':login});
        }
        catch(e){
            res.status(400).json({'Ошибка: ':'Нет пароля'});
        }
    }
    catch(e){
        console.log(e.codeName);
    }      
});

app.listen(PORT, () => {
    console.log("Server has been started...");
})