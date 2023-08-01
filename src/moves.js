const readline = require('readline');
const Table = require('./table');
const GameRules = require('./gameRules');
const HMACGenerator = require('./hmacGenerator');

class Moves {
  constructor(computerMove, args) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.args = args;
    this.computerMove = computerMove;
    this.acceptedInput = Array.from({ length: args.length }, (_, i) => i + 1);
    this.gameRules = new GameRules(args);
    this.encryptedObj = new HMACGenerator(computerMove);
  }

  play() {
    console.log('HMAC:', this.encryptedObj.hmac);
    console.log('Avaiable moves: ');
    for (let i = 0; i < this.args.length; i++) {
      console.log(`${i + 1} - ${this.args[i]}`);
    }
    console.log('0 - exit');
    console.log('? - help');

    const askForInput = () => {
      this.rl.question('Enter your move: ', (move) => {
        if (move === 'help' || move === '?') {
          const table = new Table(this.gameRules.loseConditions);
          table.generateDisplay();
          askForInput();
        } else if (this.acceptedInput.includes(Number(move))) {
          this.determineWinner(Number(move), this.computerMove);
          this.rl.close();
        } else if (move === '0' || move === 'exit') {
          this.rl.close();
        } else {
          console.log(
            `Please enter number from ${this.acceptedInput[0]} to ${
              this.acceptedInput[this.acceptedInput.length - 1]
            }.`
          );
          askForInput();
        }
      });
    };
    askForInput();
  }

  determineWinner(playerNumber, computerNumber) {
    console.log('Your move: ', this.args[playerNumber - 1]);
    console.log('Computer move: ', this.args[computerNumber - 1]);

    if (
      this.gameRules.loseConditions[this.args[playerNumber - 1]].includes(
        this.args[computerNumber - 1]
      )
    ) {
      console.log('You lost :(');
    } else if (playerNumber === computerNumber) {
      console.log('Draw!');
    } else {
      console.log('You win!');
    }

    console.log('HMAC key', this.encryptedObj.key);
  }
}

module.exports = Moves;
