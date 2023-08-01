const Moves = require('./src/moves');

try {
  const args = process.argv.slice(2);
  const computerMove = Math.ceil(Math.random() * args.length);

  const moves = new Moves(computerMove, args);
  moves.play();
} catch (error) {
  let message = 'Error. ';
  if (error instanceof Error) {
    message += error.message;
  }
  console.log(message);
  process.exit();
}
