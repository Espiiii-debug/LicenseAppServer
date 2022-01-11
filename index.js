const express = require('express');
const Console = require("console");
const {sha256} = require("js-sha256");
const hashKey = "eb/Sgg;nO5^H8_gCa3.oQ!-.%H8SBY";
const hashToken = "tetstesgsd"
const app = express();

// List Users
const userlist = new Map();


// SoftBan list
const softBanList = new Array();
softBanList.push("Espiiii", )

app.get('/login/:login/:password', (req, res) => {
    if(userlist.has(req.param.login)) {
        if(userlist.get(req.param.login) === sha256(hashKey, req.param.password)) {
            res.json({
                token: sha256(hashToken, req.param.login)
            })
        }
    } else {
        res.json({
            token: undefined
        })
    }
})
app.get('/register/:login/:password', (req, res) => {
    if(userlist.has(req.param.login)) {
        res.json({
            token: undefined
        })
        return;
    } else {
        userlist.set(req.param.login, sha256(hashKey, req.param.password));
        res.json({
            token: sha256(sha256(hashToken, req.param.login))
        })
    }
})

app.all("*", function (req, res, next) {
    console.log(req.ip);
    next();
})



app.listen(3000, () => console.log("Listening on port 3000"));


