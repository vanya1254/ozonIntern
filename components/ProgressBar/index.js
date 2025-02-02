export class ProgressBar {
  constructor(container) {
    this.container = container;
    this.state = "Normal"; // 'Normal', 'Animated', 'Hidden'
    this.value = 0;
    this.step = 1;
    this.rotation = -90;
    this.timer = undefined;

    this.init();
  }

  init() {
    this.container.innerHTML = `
    <section class="progressWrapper">
      <h3 class="progressTitle">Progress</h3>
      <div class="progressBar">
          <svg class="bar" width="100%" height="100%" aria-label="Progress Bar" viewBox="0 0 100 100">
              <circle class="defaultCircle" stroke="var(--grey-color)" stroke-width="6" cx="50%" cy="50%"  r="30%"
                fill="transparent" />
              <circle class="bar__circle" stroke="var(--primaryBlue-color)"  stroke-width="6" cx="50%" cy="50%" r="30%"
                fill="transparent">
              </circle>
          </svg>
      </div>
      <div class="controller">
        <div class="controller__col">
          <div class="controller__row">
              <input class="progressInput" id="progressInput"   type="number" min="0" max="100" placeholder="100" aria-label="Progress Value" inputmode="numeric" step="1" />
              <label for="progressInput">Value</label>
          </div>
          <div class="controller__row">
              <label class="toggle" for="animate">
                  <input type="checkbox" id="animate" aria-label="Toggle Animation" />
                  <span class="toggle_switch"></span>
              </label>
              <p>Animate</p>
          </div>
          <div class="controller__row">
              <label class="toggle" for="hide">
                  <input type="checkbox" id="hide" aria-label="Toggle Visibility" />
                  <span class="toggle_switch"></span>
              </label>
              <p>Hide</p>
          </div>
        </div>
      </div>
    </section>
    `;

    this.bar = this.container.querySelector(".bar");
    this.circle = this.container.querySelector(".bar__circle");
    this.radius = this.circle.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;

    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = `${this.circumference}`;

    this.input = this.container.querySelector("#progressInput");
    this.animateChekbox = this.container.querySelector("#animate");
    this.hideCheckbox = this.container.querySelector("#hide");

    this.bindEvents();
  }

  bindEvents() {
    //Input for progressBar

    this.input.addEventListener("change", (e) => {
      let value = e.target.value.replace(/[^0-9]/g, "");
      value = Math.min(Math.max(Number.parseInt(value || "0", 10), 0), 100);

      e.target.value = value;
    });

    // Input check

    this.input.addEventListener("change", (e) => {
      let value = Number.parseInt(e.target.value, 10);

      if (Number.isNaN(value) || value < 0 || value > 100) {
        alert("Enter number from 0 to 100");
        e.target.value = this.value;
      } else {
        this.setValue(value);
      }
    });

    //Animate for progressBar

    this.animateChekbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        this.setState("Animated");
      } else {
        this.setState("Normal");
      }
    });

    //Hide for progressBar

    this.hideCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        this.setState("Hidden");
      } else {
        this.setState("Normal");
      }
    });
  }

  setValue(value) {
    value = Math.min(Math.max(value, 0), 100);

    this.value = value;

    if (this.circumference) {
      const offset = this.circumference - (value / 100) * this.circumference;
      this.circle.style.strokeDashoffset = offset;
    }
  }

  setState(newState) {
    if (newState === this.state) return;

    this.resetStates();

    switch (newState) {
      case "Animated":
        this.startAnimate();
        break;
      case "Hidden":
        this.hide();
        break;
      default:
        this.show();
    }

    this.state = newState;
    this.updateControls();
  }

  updateControls() {
    this.animateChekbox.checked = this.state === "Animated";
    this.hideCheckbox.checked = this.state === "Hidden";
  }

  resetStates() {
    if (this.timer !== undefined) {
      cancelAnimationFrame(this.timer); // clearInterval(this.timer);
      this.rotation = -90;
      this.circle.style.transform = `rotate(${this.rotation}deg)`;
      this.timer = undefined;
    }

    this.show();
  }

  startAnimate() {
    if (this.timer !== undefined) return;

    const rotate = () => {
      this.rotation = (this.rotation + this.step) % 360;
      this.circle.style.transform = `rotate(${this.rotation}deg)`;
      this.circle.style.transformOrigin = `50% 50%`;
      this.timer = requestAnimationFrame(rotate);
    };

    rotate();

    // this.timer = setInterval(() => {
    //   this.value = (this.value + this.step) % 101;

    //   this.setValue(this.value);
    // }, 30);
  }

  hide() {
    this.bar.classList.add("hidden");
  }

  show() {
    this.bar.classList.remove("hidden");
  }
}
