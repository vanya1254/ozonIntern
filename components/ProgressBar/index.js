export class ProgressBar {
  constructor(container) {
    this.container = container;

    this.init();
  }

  init() {
    this.container.innerHTML = `
        <section class="progressWrapper">
            <div class="progressBar">
            aaa
            </div>
            <div class="controller">
            </div>
        </section>
    `;
  }
}
