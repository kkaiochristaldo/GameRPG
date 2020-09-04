
    const socket = io("http://localhost:3000");
    // const socket = io("http://50991a22e32d.ngrok.io");
    var number = 1;

    function login(event) {
        event.preventDefault();
        
        const userName = document.querySelector("input").value;
        const character = "../assets/img/draw-"+number+".png";

        if(userName) {
            var User = {
                id:"",
                name: userName,
                character: character,
                cards: 
                    [
                        card = {
                        id: "1",
                        local: "hand",
                        type: "treature"
                        },
                        card = {
                            id: "3",
                            local: "hand",
                            type: "treature"
                        },
                        card = {
                            id: "10",
                            local: "hand",
                            type: "treature"
                        },
                        card = {
                            id: "11",
                            local: "hand",
                            type: "treature"
                        }
                    ]
                ,
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

    
        function next() {
            if(number < 2) {
            number++;
            const carousel = document.querySelector(".img-carousel");
            return carousel.innerHTML = `<img src="../assets/img/draw-${number}.png">`
            }
        }
        function prev() {
            if(number > 1) {
            number--;
            const carousel = document.querySelector(".img-carousel");
            return carousel.innerHTML = `<img src="../assets/img/draw-${number}.png">`
            }
        }
        

        