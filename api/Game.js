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

    makeBet(userId, bet) { // bet = {"cash": 100, "type": even/odd/black/red}
        const bettingUser = this.users.find(u => u.id === userId);
        if (bettingUser.cash > bet["cash"]) {
            const newBet = {
                "bettingUser": bettingUser,
                "bet": bet
            }
            this.bets = [...this.bets, newBet]
        } else {
            return "You don't have enough cash for this bet!"
        }
    }

    changeBet(userId, bet) { // bet = {"cash": 100, "type": even/odd/black/red}
        const user = this.users.find(u => u.id === userId);
        const betToChange = this.bets.find(b => b.bettingUser === user);
        if (user.cash > bet["cash"]) {
            betToChange.bet = bet
        } else {
            return "You don't have enough cash for this bet!"
        }
    }

}

module.exports = Game;
