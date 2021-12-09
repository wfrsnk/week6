import express from "express";
import m from "mongoose";


const PORT = process.env.PORT || 80;
const app = express();

const schema = new m.Schema({
    login: {
        type: String
    },
    password: {
        type: String
    }
})
let user = m.model('user', schema);

app.get('/login/', (req, res) => {
    res.send('artem.wr');
})

app.post('/insert/', async (req, res, next) => {
    const URL = req.query.URL;
    const login = req.query.login;
    const password = req.query.password;
    let newUser = new user({
                login,
                password
            });
    try{
        await m.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true});
        try{
            await newUser.save();
            r.res.status(201).json({'Добавлено: ':login});
        }
        catch(e){
            r.res.status(400).json({'Ошибка: ':'Нет пароля'});
        }
    }
    catch(e){
        console.log(e.codeName);
    }      
});

app.listen(PORT, () => {
    console.log("Server has been started...");
})