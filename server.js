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


        // socket.on("FullUsers", data=>{

        //     console.log("users")

        // })

    });


server.listen(port, () => {
    console.log("Server running in port", port);
})