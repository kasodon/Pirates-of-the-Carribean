import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessages.js";
import { Diving, Falling, Hit, Jumping, Rolling, Running, Sitting } from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.vy = 0;
    this.image = playerImage;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.weight = 1;
    this.states = [new Sitting(game), new Running(game), new Jumping(game), new Falling(game), new Rolling(game), new Diving(game), new Hit(game)];
    this.currentState = null;
  }
  update(inputKeys, delta) {
    this.checkCollisions();
    this.currentState.handleInput(inputKeys);
    // horizontal movement
    this.x += this.speed;
    if (inputKeys.includes("ArrowRight") && this.currentState !== this.states[6]) {
      this.speed = this.maxSpeed;
    } else if (inputKeys.includes("ArrowLeft") && this.currentState !== this.states[6]) {
      this.speed = -this.maxSpeed;
    } else this.speed = 0;
    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
    }
    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += delta;
    }
  }
  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(stateIndex, speed) {
    this.currentState = this.states[stateIndex];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollisions() {
    this.game.enemies.forEach((enemy) => {
      if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
        enemy.markForDeletion = true;
        this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
          this.game.score++;
          this.game.floatingMessages.push(new FloatingMessage("+1", enemy.x, enemy.y, 150, 50));
        } else {
          this.game.lives--;
          if (this.game.lives === 0) {
            this.game.gameOver = true;
          }
          this.setState(6, 0);
        }
      }
    });
  }
}
