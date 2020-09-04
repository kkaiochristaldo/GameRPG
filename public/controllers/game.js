    
    const socket = io("http://localhost:3000");
    // const socket = io("http://50991a22e32d.ngrok.io");
    
    var userMain;
    var cardsMainUser = [];
    var FullUsers = [];
    window.onload = function(event) {
        event.preventDefault();
        const token = localStorage.getItem("Munchkin");
        socket.emit("ConfirmToken", token);
    }

    

    //confirmação do token
    socket.on("ConfirmedToken", data=>{
        if(data == "") {
            window.location.href = "/login";
        }
        else {
            userMain = data;
            cardsMainUser = userMain.cards;
            renderCardsHand();
        }
        // renderUsers();
    })
    
    socket.on("fullUsers", data => {
        FullUsers = data;
        const squares = document.querySelectorAll(".square-game");
        
        FullUsers.forEach( (user, i) => {
               squares[i].innerHTML = "<img src='"+user.character+"'><p class='box-name'>"+user.name+"</p>"
        })
    })
    
    
    socket.on("UpdatePage", update =>{
        window.location.href = "/game"
    })

    
        
    function renderCardsHand() {
        console.log(cardsMainUser)
        const cardsHand = document.querySelector(".card-bar");
        cardsMainUser.forEach((card, i) => {
            cardsHand.innerHTML += "<div onclick='local(event)' id='card-of-hand-"+card.id+"' class='card-of-hand'>"+card.id+"<div>"
        })
    }
