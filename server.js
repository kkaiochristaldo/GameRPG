const express = require("express");
const path = require("path");
const http = require("http");
const ejs = require("ejs");

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = require("socket.io")(server);
const router = require("./routes");


    app.use(express.static(path.join(__dirname, "public")));
    app.set("views", path.join(__dirname, "public"));
    app.engine("html", ejs.renderFile);
    app.set("view engine", "html");
    app.use(router);
    
    const users = [];
    var id = 1;
    var confirm = false;
    io.on("connection", socket => {
        
        socket.on("createUser", data=>{
            data.id = id;
            data.token = socket.id;
            socket.emit("feedbackCreateUser", socket.id);
            id++;
            users.push(data);
            console.log(data);
            socket.broadcast.emit("UpdatePage", update = true)
        })

        socket.on("ConfirmToken", data => {
            var userConfirm = [];
            for(const user in users) {
                if(users[user].token == data) {
                    userConfirm = users[user];
                }
            }
            socket.emit("ConfirmedToken", userConfirm);
            userConfirm = []
        })


        socket.emit("fullUsers", users);
        
        

    });
       
    

    
    // var sorteados = [];
    // var valorMaximo = 10;

    // function criarUnico() {
    //     if (sorteados.length == valorMaximo) {
    //         if (confirm('Já não há mais! Quer recomeçar?')) sorteados = [];
    //         else return;
    //     }
    //     var sugestao = Math.ceil(Math.random() * valorMaximo); // Escolher um numero ao acaso
    //     while (sorteados.indexOf(sugestao) >= 0) {  // Enquanto o numero já existir, escolher outro
    //         sugestao = Math.ceil(Math.random() * valorMaximo);
    //     }
    //     sorteados.push(sugestao); // adicionar este numero à array de numeros sorteados para futura referência
    //     return sugestao; // devolver o numero único
    // }



server.listen(port, () => {
    console.log("Server running in port", port);
})

