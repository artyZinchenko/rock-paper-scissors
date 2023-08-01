class GameRules {
  constructor(args) {
    const argsSet = new Set();

    for (let arg of args) {
      if (argsSet.has(arg)) {
        throw new Error(
          'Arguments should not repeat. Example "rock rock paper" will not be accepted.'
        );
      } else {
        argsSet.add(arg);
      }
    }

    if (args.length < 3 || args.length % 2 === 0)
      throw new Error(
        'Arguments number should be odd and bigger than one. Example: "rock paper scissors" or "rock paper scissors lizard spok".'
      );

    this.args = args;
    this._loseConditions = null;
  }

  get loseConditions() {
    if (this._loseConditions === null) {
      let conditions = {};
      for (let i = 0; i < this.args.length; i++) {
        const currentMove = this.args[i];
        const loses = [];

        for (let j = 1; j < this.args.length / 2; j++) {
          const target = (i + j) % this.args.length;
          loses.push(this.args[target]);
        }

        conditions[currentMove] = loses;
        this._loseConditions = conditions;
      }
    }
    return this._loseConditions;
  }
}

module.exports = GameRules;
