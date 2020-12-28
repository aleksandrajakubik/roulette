const User = require('./User')

class Game {

    constructor(id) {
        this.id = id;
        this.black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        this.red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.green = [0];
        this.users = [];
        this.maxUsers = 4;
        this.bets = [];

    }

    addUser(user) {
        if(this.users.length < this.maxUsers) {
            return this.users = [...this.users, user]
        }
        return "Room is full!"
    }

    betValidate(userCash, betCash) {
        if (userCash > betCash) {
            return true
        } else {
            return false
        }
    }

    makeBet(userId, bet) { // bet = {"cash": 100, "type": even/odd/black/red}
        const bettingUser = this.users.find(u => u.id === userId);
        const newBet = {
            "bettingUser": bettingUser,
            "bet": bet
        }
        return this.betValidate(bettingUser.cash, bet["cash"]) ? this.bets = [...this.bets, newBet] : "You don't have enough cash for this bet!"
    }

    changeBet(userId, bet) { // bet = {"cash": 100, "type": even/odd/black/red}
        const user = this.users.find(u => u.id === userId);
        const betToChange = this.bets.find(b => b.bettingUser === user);
        return this.betValidate(user.cash, bet["cash"]) ? betToChange.bet = bet : "You don't have enough cash for this bet!"
    }

}

module.exports = Game;