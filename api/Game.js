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
        this.confirmations = 0;

    }

    addUser(user) {
        if(this.users.length < this.maxUsers) {
            return this.users = [...this.users, user]
        }
        return false
    }

    _betValidate(userCash, betCash) {
        if (parseInt(userCash) > parseInt(betCash)) {
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
        return this._betValidate(bettingUser.cash, bet["cash"]) ? this.bets = [...this.bets, newBet] : false
    }

    changeBet(userId, bet) { // bet = {"cash": 100, "type": even/odd/black/red}
        const user = this.users.find(u => u.id === userId);
        const betToChange = this.bets.find(b => b.bettingUser === user);
        return this._betValidate(user.cash, bet["cash"]) ? betToChange.bet = bet : false
    }

    confirmBet() {
        this.confirmations = this.confirmations + 1;
        if(this.confirmations === this.users.length) {
            return this.roll();
        }
        return false
    }

    _getRolledColor(rolledNumber) {
        let color = null;
        if(this.black.includes(rolledNumber)){
            color = "black"
        } else if (this.red.includes(rolledNumber)) {
            color = "red"
        } else {
            color = "green"
        }
        return color
    }

    _getRolledParity(rolledNumber) {
        return rolledNumber%2===0 ? "even" : "odd"
    }

    getWinnersAndLosers(color, parity) {
        const winningBets = this.bets.filter(b => b.bet["type"] === color || b.bet["type"] === parity);
        const lostBets = this.bets.filter(b => b.bet["type"] !== color && b.bet["type"] !== parity)
        return [winningBets, lostBets]
    }

    roll() {
        const rolledNumber = Math.floor(Math.random() * 36);
        const color = this._getRolledColor(rolledNumber);
        const parity = this._getRolledParity(rolledNumber);
        const winners = this.getWinnersAndLosers(color, parity)[0];
        const losers = this.getWinnersAndLosers(color, parity)[1];
        winners.map(w => w.bettingUser.cash += parseInt(w.bet["cash"]));
        losers.map(l => l.bettingUser.cash -= parseInt(l.bet["cash"]));
        this.bets = [];
        this.confirmations = 0;
        return rolledNumber;
    }


}

module.exports = Game;