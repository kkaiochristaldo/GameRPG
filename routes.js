const express = require("express");
const router = express.Router();

    router.get("/", (req, res) => {
        return res.redirect("/login");
        
    });
    router.get("/login", (req, res) => {
        
        return res.render("./pages/login.html")
    });

    router.get("/game", (req, res) => {
        return res.render("./pages/game.html")
    });



module.exports = router;