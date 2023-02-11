import { Background } from "./background.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemies.js";
import InputHandler from "./input.js";
import { Player } from "./player.js";
import UI from "./UI.js";

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    start() {
      this.background = new Background(this);
      this.groundMargin = 80 * this.background.scaleFactor;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.speed = 0;
      this.maxSpeed = 6;
      this.enemies = [];
      this.particles = [];
      this.maxParticles = 50;
      this.collisions = [];
      this.floatingMessages = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "black";
      this.ui = new UI(this);
      this.time = 0;
      this.maxTime = 100000000;
      this.lives = 5;
      this.gameOver = false;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((e) => {
        e.draw(context);
      });
      // handle particles
      this.particles.forEach((p) => {
        p.draw(context);
      });
      // handle collisions
      this.collisions.forEach((c) => {
        c.draw(context);
      });
      // handle floating messages
      this.floatingMessages.forEach((m, index) => {
        m.draw(context);
      });
      this.ui.draw(context);
    }
    update(delta) {
      this.time += delta;
      if (this.time > this.maxTime) {
        this.gameOver = true;
      }
      this.background.update();
      this.player.update(this.input.keys, delta);
      // handle enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += delta;
      }
      this.enemies.forEach((e) => {
        e.update(delta);
      });
      this.enemies = this.enemies.filter((e) => !e.markForDeletion);
      // handle particles
      this.particles.forEach((p) => {
        p.update();
      });
      if (this.particles.length > this.maxParticles) {
        this.particles = this.particles.slice(0, this.maxParticles);
      }
      this.particles = this.particles.filter((p) => !p.markForDeletion);
      // handle collisions
      this.collisions.forEach((c) => {
        c.update(delta);
      });
      this.collisions = this.collisions.filter((c) => !c.markForDeletion);
      // handle floating messages
      this.floatingMessages.forEach((m) => {
        m.update();
      });
      this.floatingMessages = this.floatingMessages.filter((m) => !m.markForDeletion);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  game.start();

  function restartGame() {
    game.start();
    animate(0);
  }

  let lastTime = 0;
  function animate(timestamp) {
    const delta = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(delta);
    game.draw(ctx);
    if (!game.gameOver) {
      requestAnimationFrame(animate);
    }
  }
  animate(0);

  window.addEventListener("keydown", (e) => {
    if (e.key === "r" && game.gameOver) {
      restartGame();
    }
  });
});
