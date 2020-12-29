const express = require("express");
const Game = require('../Game');
const uuid = require("uuid");
const User = require("../User");
const router = express.Router();

let games = [];

router.get("/games", function(req, res) {
    if(games.length === 0){
        return res.send("No games have been created yet!")
    }
    return res.send(`Created games: ${games.map(g => g.id)}`)
});

router.post("/games", function(req, res) {
    const { nick, cash } = req.body;
    const user = new User(uuid.v4(), nick, cash);
    const newGame = new Game(uuid.v4());
    newGame.addUser(user)
    games.push(newGame)
    return res.send(newGame)
});

router.get("/games/:id", function(req, res) {
    const { id } = req.params;
    const game = games.find(game => game.id === id);
    return res.send(game)
});

router.post("/games/:id", function(req, res) {
    const { id } = req.params;
    const { nick, cash } = req.body;
    const user = new User(uuid.v4(), nick, cash);
    const game = games.find(game => game.id === id);
    let result = false;
    game.addUser(user) ? result = true : null;
    return res.send(result)
});

router.get("/games/:id/users", function(req, res) {
    const { id } = req.params;
    const game = games.find(game => game.id === id);
    return res.send(game.users)
});

router.post("/games/:id/bet", function(req, res) { 
    const { userId, cash, type } = req.body;
    const bet = {"cash": cash, "type": type};
    const { id } = req.params;
    const game = games.find(game => game.id === id);
    let result = false;
    game.makeBet(userId, bet) ? result = true : null;
    return res.send(result);
})

// router.put("/games/:id/bet", function(req, res) { 
//     const { userId, bet } = req.body;
// })


module.exports = router;