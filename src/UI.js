export default class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
    this.livesImage = liveImage;
  }
  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    // score
    context.fillText("Score: " + this.game.score, 20, 50);
    // timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + Math.floor(this.game.time * 0.001) + "s", 20, 80);
    // lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 20 + 25 * i, 95, 25, 25);
    }
    // game over
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      if (this.game.score > 5) {
        context.fillText("Boo-yeah", this.game.width * 0.5, this.game.height * 0.5 - 20);
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillText("What are the creatures of the night afraid of? YOU!!!", this.game.width * 0.5, this.game.height * 0.5 + 20);
      } else {
        context.fillText("Game over", this.game.width * 0.5, this.game.height * 0.5 - 20);
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillText("Better luck next time, press R to restart the game!", this.game.width * 0.5, this.game.height * 0.5 + 20);
      }
    }
  }
}
