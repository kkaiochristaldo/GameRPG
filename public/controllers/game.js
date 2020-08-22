    
    const socket = io("http://localhost:3000");
    var usersMain;
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
            console.log(data)
        }
    })
    
