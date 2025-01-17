export class ProgressBar {
  constructor(container) {
    this.container = container;
    this.state = "Normal"; // 'Normal', 'Animated', 'Hidden'
    this.value = 0;
    this.step = 1;
    this.timer = undefined;

    this.init();
  }

  init() {
    this.container.innerHTML = `
    <section class="progressWrapper">
      <h3 class="progressTitle">Progress</h3>
      <div class="progressBar">
          <svg class="bar" width="100%" height="100%">
              <circle class="defaultCircle" stroke="var(--grey-color)" stroke-width="10" cx="50%" cy="50%"  r="22%"
                fill="transparent" />
              <circle class="bar__circle" stroke="var(--primaryBlue-color)"  stroke-width="10" cx="50%" cy="50%" r="22%"
                fill="transparent">
              </circle>
          </svg>
      </div>
      <div class="controller">
        <div class="controller__col">
          <div class="controller__row">
              <input class="progressInput" id="progressInput"   type="number" min="0" max="100" placeholder="100" />
              <label for="progressInput">Value</label>
          </div>
          <div class="controller__row">
              <label class="toggle" for="animate">
                  <input type="checkbox" id="animate" />
                  <span class="toggle_switch"></span>
              </label>
              <p>Animate</p>
          </div>
          <div class="controller__row">
              <label class="toggle" for="hide">
                  <input type="checkbox" id="hide" />
                  <span class="toggle_switch"></span>
              </label>
              <p>Hide</p>
          </div>
        </div>
      </div>
    </section>
    `;

    this.circle = this.container.querySelector(".bar__circle");
    this.radius = this.circle.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;

    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = `${this.circumference}`;

    //Input for progressBar
    this.input = this.container.querySelector("#progressInput");
    this.input.addEventListener("change", (e) => {
      const value = Number.parseInt(e.target.value)
        ? Number.parseInt(e.target.value)
        : 0;

      this.setValue(value);
    });

    //Animate for progressBar
    this.animateChekbox = this.container.querySelector("#animate");
    this.animateChekbox.addEventListener("change", (e) => {
      if (this.state === "Hidden") {
        this.resetStates();
        this.hideCheckbox.checked = false;
      }

      this.state = this.state === "Animated" ? "Normal" : "Animated";
      e.target.checked = this.state === "Animated";

      if (e.target.checked) {
        this.startAnimate();
      } else {
        this.stopAnimate();
      }
    });

    //Hide for progressBar
    this.hideCheckbox = this.container.querySelector("#hide");
    this.hideCheckbox.addEventListener("change", (e) => {
      if (this.state === "Animated") {
        this.resetStates();
        this.animateChekbox.checked = false;
      }

      this.state = this.state === "Hidden" ? "Normal" : "Hidden";
      e.target.checked = this.state === "Hidden";

      if (e.target.checked) {
        this.hide();
      } else {
        this.show();
      }
    });
  }

  setValue(value) {
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    this.value = value;

    if (this.circumference) {
      const offset = this.circumference - (value / 100) * this.circumference;
      this.circle.style.strokeDashoffset = offset;
    }
  }

  resetStates() {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

    this.bar = this.container.querySelector(".bar");
    this.bar.classList.remove("hidden");
    this.state = "Normal";
  }

  startAnimate() {
    this.state = "Animated";

    if (this.timer !== undefined) return;

    this.timer = setInterval(() => {
      this.value = (this.value + this.step) % 101;

      this.setValue(this.value);
    }, 30);
  }

  stopAnimate() {
    this.state = "Normal";

    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  hide() {
    this.bar = this.container.querySelector(".bar");

    this.bar.classList.add("hidden");
  }

  show() {
    this.bar = this.container.querySelector(".bar");

    this.bar.classList.remove("hidden");
  }
}
