const CliTable = require('cli-table');

class Table {
  constructor(loseConditions) {
    this.loseConditions = loseConditions;
    this.headers = Object.keys(this.loseConditions);
  }

  generateDisplay() {
    console.log(
      'This table displays your result in every possible scenario of the game.'
    );
    console.log(this.createTable());
  }

  createTableArray() {
    let tableArr = [];
    for (let i = 0; i < this.headers.length; i++) {
      let obj = {};
      for (let j = 0; j < this.headers.length; j++) {
        if (this.loseConditions[this.headers[i]].includes(this.headers[j])) {
          obj[this.headers[j]] = 'Win';
        } else if (this.headers[i] === this.headers[j]) {
          obj[this.headers[j]] = 'Draw';
        } else {
          obj[this.headers[j]] = 'Lose';
        }
      }
      tableArr.push(obj);
    }
    return tableArr;
  }

  createTable() {
    const tableArr = this.createTableArray();

    const table = new CliTable({
      style: { 'padding-left': 1, 'padding-right': 1 }, // Customize padding between columns
    });

    table.push(['v PC/User >', ...this.headers]);
    tableArr.forEach((row, index) => {
      table.push([this.headers[index], ...Object.values(row)]);
    });

    return table.toString();
  }
}

module.exports = Table;
