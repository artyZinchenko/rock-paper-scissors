const crypto = require('crypto');

class HMACGenerator {
  constructor(computerMove) {
    this.computerMove = computerMove;
    this._hmac = null;
    this.key = crypto.randomBytes(32).toString('hex');
  }

  get hmac() {
    if (this._hmac === null) {
      const hmac = crypto.createHmac('sha3-256', this.key);
      hmac.update(this.computerMove.toString());
      this._hmac = hmac.digest('hex');
    }
    return this._hmac;
  }
}

module.exports = HMACGenerator;
