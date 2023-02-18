/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import player from './assets/player-BIG.png';
import layer1 from './assets/1.png';
import layer2 from './assets/2.png';
import layer3 from './assets/3.png';
import layer4 from './assets/4.png';
import layer5 from './assets/7.png';
import enemy_fly from './assets/bomb.png';
import blast from './assets/blast.png';
import fruity from './assets/fruity.png';
import enemy_plant from './assets/cherry.png';
import enemy_spider from './assets/enemy_spider.png';
import enemy_spider_big from './assets/enemy_spider_big.png';
import fire from './assets/fire.png';
import boom from './assets/boom.png';
import lives from './assets/apple.png';
import fire_ball from './assets/projectile.png';
import blast_sound from './assets/flash.wav';
import life_sound from './assets/life.wav';
import rocky_sound from './assets/stop.wav';
import shoot_sound from './assets/laser.wav';
import bg_sound from './assets/bg.wav';

function App() {
  const canvas = React.useRef();
    React.useEffect(() => {
   const ctx = canvas.current.getContext("2d");
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // const bgSound = new Audio(`${bg_sound}`);
        class Game {
            constructor(width, height) {
              this.width = width;
              this.height = height;
            }
            start() {
              this.background = new Background(this);
              this.groundMargin = 20 * this.background.scaleFactor;
              this.player = new Player(this);
              this.projectile = new Projectile(this);
              this.input = new InputHandler(this);
              this.bgSound = new Audio(bg_sound);
              this.blastSound = new Audio(blast_sound);
              this.lifeSound = new Audio(life_sound);
              this.rockySound = new Audio(rocky_sound);
              this.shootSound = new Audio(shoot_sound);
              this.speed = 0;
              this.maxSpeed = 3;
              this.enemies = [];
              this.particles = [];
              this.maxParticles = 30;
              this.collisions = [];
              this.floatingMessages = [];
              this.enemyTimer = 0;
              this.enemyInterval = 1000 + Math.random () * 2.1;
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
              this.projectile.update();
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
    class Layer {
        constructor(game, width, height, speedModifier, image) {
          this.game = game;
          this.width = width;
          this.height = height;
          this.speedModifier = speedModifier;
          this.image = image;
          this.x = 0;
          this.y = 0;
        }
        update() {
          if (this.x < -this.width) this.x = 0;
          else this.x -= this.game.speed * this.speedModifier;
        }
        draw(context) {
          context.drawImage(this.image, this.x, this.y, this.width, this.height);
          context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
      }
      
      class Background {
        constructor(game) {
          this.game = game;
          this.imageWidth = 1667;
          this.imageHeight = 500;
          this.scaleFactor = this.game.height / this.imageHeight;
          this.width = this.imageWidth * this.scaleFactor;
          this.height = this.imageHeight * this.scaleFactor;
          this.layer5Image = layer5Image;
          this.layer4Image = layer4Image;
          this.layer3Image = layer3Image;
          this.layer2Image = layer2Image;
          this.layer1Image = layer1Image;
          this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image);
          this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2Image);
          this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3Image);
          this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Image);
          this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image);
          this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
        }
        update() {
          this.backgroundLayers.forEach((b) => {
            b.update();
          });
        }
        draw(context) {
          this.backgroundLayers.forEach((b) => {
            b.draw(context);
          });
        }
      }

      class Enemy {
        constructor() {
          this.frameX = 0;
          this.frameY = 0;
          this.fps = 20;
          this.frameInterval = 1000 / this.fps;
          this.frameTimer = 0;
          this.markForDeletion = false;
        }
        update(deltaTime) {
          // movement
          this.x -= this.speedX + this.game.speed;
          this.y += this.speedY;
          if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
          } else this.frameTimer += deltaTime;
          // check off screen
          if (this.x + this.width < 0) this.markForDeletion = true;
        }
        draw(context) {
          if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
          }
          context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
      }
      
      class FlyingEnemy extends Enemy {
        constructor(game) {
          super();
          this.game = game;
          this.width = 100;
          this.height = 90;
          this.x = this.game.width + Math.random() * this.game.width * 0.05;
          this.y = Math.random() * this.game.height * 1.3;
          this.speedX = Math.random() + 0.0001;
          this.speedY = 0;
          this.maxFrame = 4;
          this.image = flyImage;
          this.angle = 0;
          this.va = Math.random() * 0.0001 + 0.0001; // velocity angle
          this.type = 'flying-enemy';
        }
        update(deltaTime) {
          super.update(deltaTime);
          this.angle += this.va;
          this.y += Math.sin(this.angle);
        }
      }

      class GroundEnemy extends Enemy {
        constructor(game) {
          super();
          this.game = game;
          this.width = 100;
          this.height = 100;
          this.x = this.game.width + Math.random() * this.game.width * 0.05;
          this.y = Math.random() * this.game.height * 1.3;
          this.speedX = 0;
          this.speedY = 0;
          this.maxFrame = 1;
          this.image = plantImage;
          this.type = 'ground-enemy';
        }
      }
      class ClimbingEnemy extends Enemy {
        constructor(game) {
          super();
          this.game = game;
          this.width = 375;
          this.height = 306;
          this.x = this.game.width;
          this.y = Math.random() * this.game.height * 0.5;
          this.image = spiderBigImage;
          this.speedX = 0;
          this.speedY = Math.random() > 0.5 ? 1 : -1;
          this.maxFrame = 3;
          this.type = 'climbing-enemy';
        }
        update(deltaTime) {
          super.update(deltaTime);
          if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
          if (this.y < -this.height) this.markForDeletion = true;
        }
        
      }

      class InputHandler {
        constructor(game) {
          this.keys = [];
          window.addEventListener("keydown", (e) => {
            if (this.keys.indexOf(e.key) === -1 && ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Enter", "Space", "r", "R", "s", "S"].includes(e.key)) {
              this.keys.push(e.key);
              // console.log(e.key)
            } else if (e.key === "d") {
              game.debug = !game.debug;
            }
          });
          window.addEventListener("keyup", (e) => {
            if (this.keys.indexOf(e.key) !== -1) {
              this.keys.splice(this.keys.indexOf(e.key), 1);
            }
          });
        }
      }

      class Player {
        constructor(game) {
          this.game = game;
          this.width = 302;
          this.height = 261;
          this.x = 0;
          this.y = this.game.height - this.height - this.game.groundMargin;
          this.vy = 0;
          this.projectiles = [];
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
          this.states = [new Sitting(game), new Running(game), new Jumping(game), new Falling(game), new Rolling(game), new Diving(game), new Hit(game), new Shooting(game),];
          this.currentState = null;
        }
        update(inputKeys, delta) {
          this.checkCollisions();
          this.currentState.handleInput(inputKeys);

          if (this.game.gameOver === false) {
            this.game.bgSound.volume = 0.3;
            this.game.bgSound.play();
          } 
          else if (this.game.gameOver === true) {
            this.game.bgSound.pause();
          }
        
          // horizontal movement
          if (inputKeys.includes("ArrowRight") && this.currentState !== this.states[6]) {
            this.x += this.maxSpeed + 0.001;
          } else if (inputKeys.includes("ArrowLeft") && this.currentState !== this.states[6]) {
            this.x -= this.maxSpeed + 0.001;
          } else if (inputKeys.includes("s") && this.currentState !== this.states[6]) {	
            this.projectiles.forEach((projectile) => {	
              projectile.update();	
            });	
            this.projectiles = this.projectiles.filter(	
              (projectile) => !projectile.markedForDeletion	
            );	
          } else this.speed = 0;
        
          // horizontal boundaries
          if (this.x < 0) this.x = 0;
          if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        
          // vertical movement
          if (inputKeys.includes("ArrowUp") && this.currentState !== this.states[6]) {
            this.y -= this.maxSpeed + 0.001;
          } else if (inputKeys.includes("ArrowDown") && this.currentState !== this.states[6]) {
            this.y += this.maxSpeed + 0.001;
          } else if (inputKeys.includes("s") && this.currentState !== this.states[6]) {	
            this.projectiles.forEach((projectile) => {	
              projectile.update();	
            });	
            this.projectiles = this.projectiles.filter(	
              (projectile) => !projectile.markedForDeletion	
            );	
          } else this.speed = 0;
        
          // vertical boundaries
          if (this.y < 0) this.y = 0;
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
          this.projectiles.forEach((projectile) => {
            projectile.draw(context);
          });
          context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        shootTop() {
            this.projectiles.push(
              new Projectile(this.game, this.x + 80, this.y + 30)
            );
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
            if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y && enemy.type === 'climbing-enemy') {
              this.game.rockySound.play();
              enemy.markForDeletion = true;
              this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
              if (this.currentState === this.states[0] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[7]) {
                this.game.score++;
                this.game.floatingMessages.push(new FloatingMessage("+1", enemy.x, enemy.y, 150, 50));
              } else {
                this.game.lives--;
                if (this.game.lives === 0) {
                  this.game.gameOver = true;
                }
                this.setState(6, 0);
              }
            } else if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y && enemy.type === 'flying-enemy') {
              this.game.blastSound.play();
              enemy.markForDeletion = true;
              this.game.collisions.push(new CollisionBlastAnimation(this.game, enemy.x + enemy.width * 0.3, enemy.y + enemy.height * 0.3));
              if (this.currentState === this.states[0] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[7]) {
                if (this.game.score > 0) {
                  this.game.score--;
                }
                this.game.lives--;
                this.game.floatingMessages.push(new FloatingMessage("-1 ☠️", enemy.x, enemy.y, 150, 50));
                if (this.game.lives === 0) {
                  this.game.gameOver = true;
                }
              } else {
                this.game.lives--;
                if (this.game.lives === 0) {
                  this.game.gameOver = true;
                }
                this.setState(6, 0);
              }
            } else if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y && enemy.type === 'ground-enemy') {
              this.game.lifeSound.play();
              enemy.markForDeletion = true;
              this.game.collisions.push(new CollisionFruityAnimation(this.game, enemy.x + enemy.width * 0.3, enemy.y + enemy.height * 0.3));
              if (this.currentState === this.states[0] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[7]) {
                this.game.lives++;
                this.game.floatingMessages.push(new FloatingMessage("+1 🍎", enemy.x, enemy.y, 140, 50));
                if (this.game.lives === 0) {
                  this.game.gameOver = true;
                }
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

      const states = {
        SITTING: 0,
        RUNNING: 1,
        JUMPING: 2,
        FALLING: 3,
        ROLLING: 4,
        DIVING: 5,
        HIT: 6,
        SHOOTING: 7,
      };
      
      class State {
        constructor(state, game) {
          this.state = state;
          this.game = game;
        }
      }
      
      class Sitting extends State {
        constructor(game) {
          super("SITTING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 5;
          this.game.player.maxFrame = 4;
        }
        handleInput(inputKeys) {
          if (inputKeys.includes("ArrowLeft")) {
            this.game.player.setState(states.RUNNING, 2);
          } 
          else if (inputKeys.includes("ArrowRight")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowUp")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowDown")) {
            this.game.player.setState(states.RUNNING, 2);
          }
          else if (inputKeys.includes("Enter")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("s")) {
            this.game.player.setState(states.SHOOTING, 2);
          }
        }
      }
      
      class Running extends State {
        constructor(game) {
          super("RUNNING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.maxFrame = 8;
          this.game.player.frameY = 3;
        }
        handleInput(inputKeys) {
          this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.05, this.game.player.y + this.game.player.height));
          if (inputKeys.includes("ArrowDown")) this.game.player.setState(states.RUNNING, 2);
          else if (inputKeys.includes("ArrowLeft")) {
            this.game.player.setState(states.RUNNING, 2);
          } 
          else if (inputKeys.includes("ArrowRight")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowUp")) {
            this.game.player.setState(states.RUNNING, 2);
          }
          else if (inputKeys.includes("Enter")) {
            this.game.player.setState(states.ROLLING, 2);
          } else if (inputKeys.includes("s")) {
            this.game.player.setState(states.SHOOTING, 2);
          }
        }
      }
      
      class Jumping extends State {
        constructor(game) {
          super("JUMPING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 1;
          this.game.player.maxFrame = 6;
          if (this.game.player.onGround()) this.game.player.vy = -27;
        }
        handleInput(inputKeys) {
          if (this.game.player.vy > this.game.player.weight) this.game.player.setState(states.FALLING, 1);
          else if (inputKeys.includes("Enter")) {
            this.game.player.setState(states.ROLLING, 2);
          } else if (inputKeys.includes("ArrowLeft")) {
            this.game.player.setState(states.RUNNING, 2);
          } 
          else if (inputKeys.includes("ArrowRight")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowUp")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowDown")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("s")) {
            this.game.player.setState(states.SHOOTING, 2);
          }
        }
      }
      
      class Falling extends State {
        constructor(game) {
          super("FALLING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 2;
          this.game.player.maxFrame = 6;
        }
        handleInput(inputKeys) {
          if (this.game.player.onGround()) this.game.player.setState(states.RUNNING, 1);
          else if (inputKeys.includes("ArrowLeft")) {
            this.game.player.setState(states.RUNNING, 2);
          } 
          else if (inputKeys.includes("ArrowRight")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowUp")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowDown")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("s")) {
            this.game.player.setState(states.SHOOTING, 2);
          }
        }
      }
      
      class Rolling extends State {
        constructor(game) {
          super("ROLLING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 6;
          this.game.player.maxFrame = 6;
        }
        handleInput(inputKeys) {
          this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
          if (!inputKeys.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
          } else if (!inputKeys.includes("Enter") && !this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
          } else if (inputKeys.includes("Enter") && inputKeys.includes("ArrowUp") && this.game.player.onGround()) {
            this.game.player.vy -= 27;
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowDown") && !this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("s")) {
            this.game.player.setState(states.SHOOTING, 2);
          } else if (inputKeys.includes("ArrowLeft")) {
            this.game.player.setState(states.RUNNING, 2);
          } 
          else if (inputKeys.includes("ArrowRight")) {
            this.game.player.setState(states.RUNNING, 2);
          }
        }
      }
      
      class Diving extends State {
        constructor(game) {
          super("DIVING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 6;
          this.game.player.maxFrame = 6;
          this.game.player.vy = 5;
        }
        handleInput(inputKeys) {
          this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
          if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
            for (let i = 0; i < 30; i++) {
              this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
            }
          } else if (inputKeys.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("s")) {
            this.game.player.setState(states.SHOOTING, 2);
          } else if (inputKeys.includes("ArrowLeft")) {
            this.game.player.setState(states.RUNNING, 2);
          } 
          else if (inputKeys.includes("ArrowRight")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowUp")) {
            this.game.player.setState(states.RUNNING, 2);
          } else if (inputKeys.includes("ArrowDown")) {
            this.game.player.setState(states.RUNNING, 2);
          }
        }
      }
      
      class Hit extends State {
        constructor(game) {
          super("HIT", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 4;
          this.game.player.maxFrame = 10;
        }
        handleInput(inputKeys) {
          if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
          } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
          } else if (inputKeys.includes("s")) {
            this.game.player.setState(states.SHOOTING, 2);
          }
        }
      }

      class Shooting extends State {
        constructor(game) {
          super("SHOOTING", game);
        }
        enter() {
          this.game.player.frameX = 5;
          this.game.player.frameY = 1;
          this.game.player.maxFrame = 1;
          this.game.shootSound.play();
          this.game.particles.unshift(new Projectile(this.game, this.game.player.x + this.game.player.width * 0.55, this.game.player.y + this.game.player.height * 0.5));
          this.game.projectile.vy = -27;
        }
        handleInput(inputKeys) {
          if (inputKeys.includes("ArrowLeft")) {
            this.game.player.setState(states.RUNNING, 1);
          } 
          else if (inputKeys.includes("ArrowRight")) {
            this.game.player.setState(states.RUNNING, 1);
          } else if (inputKeys.includes("ArrowUp")) {
            this.game.player.setState(states.RUNNING, 1);
          } else if (inputKeys.includes("ArrowDown")) {
            this.game.player.setState(states.RUNNING, 1);
          } else if (inputKeys.includes("s")) {
            this.game.player.setState(states.RUNNING, 1);
          }
        }
      }

      class Particle {
        constructor(game) {
          this.game = game;
          this.markForDeletion = false;
        }
        update() {
          this.x -= this.speedX + this.game.speed;
          this.y -= this.speedY;
          this.size *= 0.95;
          if (this.size < 0.5) this.markForDeletion = true;
        }
      }

      class Projectile extends Particle {
        constructor(game, x, y) {
          super(game);
          this.game = game;
          this.x = x;
          this.y = y;
          this.vy = 0;
          this.width = 10;
          this.height = 10;
          this.speed = 5;
          this.image = fireBallImage;
          this.states = this.game.player.states;
          this.currentState = this.game.player.currentState;
        }

        draw(context) {
          context.drawImage(this.image, this.x, this.y);
        }
    
        update() {
          this.checkCollisions();
          this.x += this.speed;
          if (this.x > this.game.width * 1.8) this.markedForDeletion = true;
        }

        checkCollisions() {
          this.game.enemies.forEach((enemy) => {
            if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
              enemy.markForDeletion = true;
              this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
              if (this.currentState === this.states[0] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[7]) {
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
      
      class Dust extends Particle {
        constructor(game, x, y) {
          super(game);
          this.size = Math.random() * 10.2 + 10;
          this.x = x + 40;
          this.y = y - 50;
          this.speedX = Math.random() * 0.2;
          this.speedY = Math.random() * 2.2;
          this.color = "rgba(255,255,255,0.3)";
        }
        draw(context) {
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          context.fillStyle = this.color;
          context.fill();
        }
      }
      
      class Splash extends Particle {
        constructor(game, x, y) {
          super(game);
          this.size = Math.random() * 100 + 100;
          this.x = x - this.size * 0.4;
          this.y = y - this.size * 0.5;
          this.speedX = Math.random() * 6 - 4;
          this.speedY = Math.random() * 4 + 1;
          this.gravity = 0;
          this.image = fireTexture;
        }
        draw(context) {
          context.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
        update() {
          super.update();
          this.gravity += 0.1;
          this.y += this.gravity;
        }
      }
      
      class Fire extends Particle {
        constructor(game, x, y) {
          super(game);
          this.image = fireTexture;
          this.size = Math.random() * 10 + 50;
          this.x = x - 50;
          this.y = y;
          this.speedX = 1;
          this.speedY = 1;
          this.angle = 0;
          this.va = Math.random() * 0.02 - 0.1;
        }
        draw(context) {
          context.save();
          context.translate(this.x, this.y);
          context.rotate(this.angle * 5);
          context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
          context.restore();
        }
        update() {
          super.update();
          this.angle += this.va;
          this.x += Math.sin(this.angle);
        }
      }

      class FloatingMessage {
        constructor(value, x, y, targetX, targetY) {
          this.value = value;
          this.x = x;
          this.y = y;
          this.targetX = targetX;
          this.targetY = targetY;
          this.timer = 0;
          this.markForDeletion = false;
        }
        update() {
          this.x += (this.targetX - this.x) * 0.03;
          this.y += (this.targetY - this.y) * 0.03;
          this.timer++;
          if (this.timer > 100) {
            this.markForDeletion = true;
          }
        }
        draw(context) {
          context.font = "40px " + this.fontFamily;
          context.fillStyle = "white";
          context.fillText(this.value, this.x, this.y);
          context.fillStyle = "black";
          context.fillText(this.value, this.x - 2, this.y - 2);
        }
      }

      class CollisionAnimation {
        constructor(game, x, y) {
          this.game = game;
          this.image = boomImage;
          this.x = x;
          this.y = y;
          this.spriteWidth = 100;
          this.spriteHeight = 90;
          this.sizeModifier = Math.random() + 0.5;
          this.width = this.spriteWidth * this.sizeModifier;
          this.height = this.spriteHeight * this.sizeModifier;
          this.x = x - this.width * 0.5;
          this.y = y - this.height * 0.5;
          this.frameX = 0;
          this.maxFrame = 4;
          this.markForDeletion = false;
          this.fps = Math.random() * 10 + 5;
          this.frameInterval = 1000 / this.fps;
          this.frameTimer = 0;
        }
        draw(context) {
          context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        update(delta) {
          this.x -= this.game.speed;
          if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            if (this.frameX > this.maxFrame) this.markForDeletion = true;
            this.frameTimer = 0;
          } else this.frameTimer += delta;
        }
      }

      class CollisionBlastAnimation {
        constructor(game, x, y) {
          this.game = game;
          this.image = blastImage;
          this.x = x;
          this.y = y;
          this.spriteWidth = 158;
          this.spriteHeight = 158;
          this.sizeModifier = Math.random() + 0.5;
          this.width = this.spriteWidth * this.sizeModifier;
          this.height = this.spriteHeight * this.sizeModifier;
          this.x = x - this.width * 0.5;
          this.y = y - this.height * 0.5;
          this.frameX = 0;
          this.maxFrame = 9;
          this.markForDeletion = false;
          this.fps = Math.random() * 10 + 5;
          this.frameInterval = 1000 / this.fps;
          this.frameTimer = 0;
        }
        draw(context) {
          context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        update(delta) {
          this.x -= this.game.speed;
          if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            if (this.frameX > this.maxFrame) this.markForDeletion = true;
            this.frameTimer = 0;
          } else this.frameTimer += delta;
        }
      }

      class CollisionFruityAnimation {
        constructor(game, x, y) {
          this.game = game;
          this.image = fruityImage;
          this.x = x;
          this.y = y;
          this.spriteWidth = 158;
          this.spriteHeight = 158;
          this.sizeModifier = Math.random() + 0.5;
          this.width = this.spriteWidth * this.sizeModifier;
          this.height = this.spriteHeight * this.sizeModifier;
          this.x = x - this.width * 0.5;
          this.y = y - this.height * 0.5;
          this.frameX = 0;
          this.maxFrame = 9;
          this.markForDeletion = false;
          this.fps = Math.random() * 10 + 5;
          this.frameInterval = 1000 / this.fps;
          this.frameTimer = 0;
        }
        draw(context) {
          context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        update(delta) {
          this.x -= this.game.speed;
          if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            if (this.frameX > this.maxFrame) this.markForDeletion = true;
            this.frameTimer = 0;
          } else this.frameTimer += delta;
        }
      }

      class UI {
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



  return (
    <div className="App">
      <canvas id="canvas1" ref={canvas} />
          <img id="playerImage" src={player} alt="" />
    <img id="layer1Image" src={layer1} alt="" />
    <img id="layer2Image" src={layer2} alt="" />
    <img id="layer3Image" src={layer3} alt="" />
    <img id="layer4Image" src={layer4} alt="" />
    <img id="layer5Image" src={layer5} alt="" />
    <img id="flyImage" src={enemy_fly} alt=""/>
    <img id="plantImage" src={enemy_plant} alt=""/>
    <img id="spiderImage" src={enemy_spider} alt=""/>
    <img id="spiderBigImage" src={enemy_spider_big} alt=""/>
    <img id="fireTexture" src={fire} alt=""/>
    <img id="boomImage" src={boom} alt=""/>
    <img id="liveImage" src={lives} alt=""/>
    <img id="fireBallImage" src={fire_ball} alt=""/>
    <img id="blastImage" src={blast} alt=""/>
    <img id="fruityImage" src={fruity} alt=""/>
    </div>
  );
}

App.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default App;