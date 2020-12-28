const express = require("express");
const router = express.Router();

let games = [];

router.get("/games", function(req, res, next) {
    if(games.length === 0){
        return res.send(false)
    }
    return res.send(games)
});

module.exports = router;