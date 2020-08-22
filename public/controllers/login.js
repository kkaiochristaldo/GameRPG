
    var socket = io("http://localhost:3000");

    function login(event) {
        event.preventDefault();
        
        const userName = document.querySelector("input").value;
        // const character = document.querySelector("")
        if(userName) {
            var User = {
                id:"",
                name: userName,
                character:"",
                cards: [],
                token: "",
            }
            socket.emit("createUser", User);
        }
    }

    socket.on("feedbackCreateUser", data=>{
        localStorage.setItem("Munchkin", data);
        window.location.href = "/game";
    });

    window.onload = function(){
        const token = localStorage.getItem("Munchkin");
        if(token) {
            socket.emit("ConfirmToken", token);
        }
    }

    socket.on("ConfirmedToken", data => {
        if(data == "") {}
        else {
            window.location.href = "/game";
            console.log(data);
        }
    })
        