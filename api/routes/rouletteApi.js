const express = require("express");
const Game = require('../Game');
const uuid = require("uuid");
const User = require("../User");
const router = express.Router();
const MQTT = require("async-mqtt");

const client = MQTT.connect("tcp://10.45.3.251:1883");

let games = [];
let answers = [];

router.get("/games", function(req, res) {
    if(games.length === 0){
        return res.send(false)
    }
    return res.send(`${JSON.stringify(games)}`)
});

router.post("/games", function(req, res) {
    const { nick, cash } = req.body;
    const user = new User(uuid.v4(), nick, parseInt(cash));
    const newGame = new Game(uuid.v4());
    newGame.addUser(user)
    games.push(newGame)
    return res.send([user, newGame])
});

router.get("/games/:id", function(req, res) {
    const { id } = req.params;
    const game = games.find(game => game.id === id);
    const viewerId = uuid.v4();
    return res.send([viewerId, game])
});

router.post("/games/:id", function(req, res) {
    const { id } = req.params;
    const { nick, cash } = req.body;
    const user = new User(uuid.v4(), nick, parseInt(cash));
    const game = games.find(game => game.id === id);
    game.addUser(user);
    client.publish("update", `${JSON.stringify({"id": game.id, "users": game.users, "bets": game.bets})}`)
    return res.send([user, game])
});

router.get("/games/:id/users", function(req, res) {
    const { id } = req.params;
    const game = games.find(game => game.id === id);
    return res.send(game.users)
});

router.delete("/games/:id/users/:userId", function(req, res) {
    const { id, userId } = req.params;
    const game = games.find(game => game.id === id);
    game.deleteUser(userId);
    client.publish("update", `${JSON.stringify({"id": game.id, "users": game.users, "bets": game.bets})}`)
    if(game.users.length === 0) {
        games = games.filter(g => g !== game)
    }
    return res.send(true);
})

router.post("/games/:id/bet", function(req, res) { 
    const { userId, cash, type } = req.body;
    const bet = {"cash": parseInt(cash), "type": type};
    const { id } = req.params;
    const game = games.find(game => game.id === id);
    let result = false;
    game.makeBet(userId, bet) ? result = true : null;
    client.publish("update", `${JSON.stringify({"id": game.id, "users": game.users, "bets": game.bets})}`)
    return res.send(result);
});

router.post("/games/:id/confirm", function(req, res) { 
    const { id } = req.params;
    const game = games.find(game => game.id === id );
    const result = game.confirmBet();
    if(result) {
        client.publish("update", `${JSON.stringify({"id": game.id, "users": game.users, "bets": game.bets})}`)
        client.publish(`rolledNumber/${id}`, `${result}`)
    }
    return res.send(true)
});

router.post("/games/:id/request", function(req, res) { 
    const { id } = req.params;
    const { answer, userId, nick, betType, betCash } = req.body;
    const game = games.find(game => game.id === id );
    game.answers = [...game.answers, answer]
    client.subscribe('clear')
    client.on('message', (topic, payload, packet) => {
        if (topic === 'clear') {
            game.answers = [];
        }
      });
    if(game.answers.length === game.users.length) {
        game.answers.filter(a => a === "YES").length === game.users.length ? 
        client.publish(`answer/${id}`, `${JSON.stringify({"answer": "YES", "nick": nick, "betCash": betCash, "betType": betType})}`) : 
        client.publish(`answer/${id}`, `${JSON.stringify({"answer": "NO", "nick": nick, "betCash": betCash, "betType": betType})}`)
        const bet = {"cash": parseInt(betCash), "type": betType}
        game.changeBet(userId, bet) ? result = true : null;
    }
    return res.send(true)
});

router.put("/games/:id/bet", function(req, res) { 
    const { userId, cash, type } = req.body;
    const bet = {"cash": parseInt(cash), "type": type};
    const { id } = req.params;
    const game = games.find(game => game.id === id);
    let result = false;
    game.changeBet(userId, bet) ? result = true : null;
    client.publish("update", `${JSON.stringify({"id": game.id, "users": game.users, "bets": game.bets})}`)
    return res.send(result)
});



module.exports = router;