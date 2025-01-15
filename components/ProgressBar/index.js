export class ProgressBar {
  constructor(container) {
    this.container = container;
    this.state = "Normal"; // 'Normal', 'Animated', 'Hidden'
    this.value = 0;

    this.init();
  }

  init() {
    this.container.innerHTML = `
    <section class="progressWrapper">
        <div class="progressBar">
            <h3 class="progressBar_title">Progress</h3>
            <svg class="bar" width="100%" height="100%">
                <circle class="defaultCircle" stroke="#f1f1f1"       stroke-width="10" cx="50%" cy="50%" r="28%"
                fill="transparent" />
                <circle class="bar__circle" stroke="#1b40e2"    stroke-width="10" cx="50%" cy="50%" r="28%"
                    fill="transparent" />
            </svg>
        </div>
        <div class="controller">
            <input id="progressInput" type="number" min="0" max="100"/>
            <label>Value</label>
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
      this.setValue(Number.parseInt(e.target.value));
    });
  }

  setValue(value) {
    if (value < 0 || value > 100) return;

    this.value = value;

    if (this.circumference) {
      const offset = this.circumference - (value / 100) * this.circumference;

      this.circle.style.strokeDashoffset = offset;
    }
  }
}
