export default class InputHandler {
  constructor(game) {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1 && ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Enter", "Space", "r", "R"].includes(e.key)) {
        this.keys.push(e.key);
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
