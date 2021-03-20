export default class App {
  reqUrl =
    "https://v6.exchangerate-api.com/v6/a2588e4ad88e1957be813969/latest/USD";
  data = {};

  srcRate = 1;
  dstRate = 1;
  exRate = 1;

  srcInputValue = 0;
  dstInputValue = 0;

  srcEl = document.querySelector(".src");
  dstEl = document.querySelector(".dst");
  calEl = document.querySelector(".calculation");
  swpEl = document.querySelector(".swap");

  constructor() {
    this.initializeRipple();
    this.initializeCalculator();
    this.setHandlers();
  }

  calculateRateSrc = (srcSelEl, srcInEl, dstSelEl, dstInEl, calEl) => {
    this.exRate = 1 / (this.srcRate / this.dstRate);

    calEl.textContent = `${this.srcInputValue} ${
      srcSelEl.options[srcSelEl.selectedIndex].text
    } = ${(this.srcInputValue * this.exRate).toFixed(2)} ${
      dstSelEl.options[dstSelEl.selectedIndex].text
    }`;

    dstInEl.value = (this.srcInputValue * this.exRate).toFixed(2);
  };

  calculateRateDst = (srcSelEl, srcInEl, dstSelEl, dstInEl, calEl) => {
    this.exRate = 1 / (this.srcRate / this.dstRate);

    calEl.textContent = `${this.dstInputValue * this.exRate} ${
      srcSelEl.options[srcSelEl.selectedIndex].text
    } = ${this.dstInputValue} ${dstSelEl.options[dstSelEl.selectedIndex].text}`;

    srcInEl.value = (this.dstInputValue * this.exRate).toFixed(2);
  };

  setHandlers = () => {
    const srcSelect = this.srcEl.firstElementChild;
    const srcInput = this.srcEl.lastElementChild;
    const dstSelect = this.dstEl.firstElementChild;
    const dstInput = this.dstEl.lastElementChild;
    const calculation = this.calEl;

    srcSelect.onchange = (e) => {
      this.srcRate = e.target.value;
      this.calculateRateSrc(
        srcSelect,
        srcInput,
        dstSelect,
        dstInput,
        calculation
      );
    };
    srcInput.onchange = (e) => {
      this.srcInputValue = e.target.value;
      this.calculateRateSrc(
        srcSelect,
        srcInput,
        dstSelect,
        dstInput,
        calculation
      );
    };
    dstSelect.onchange = (e) => {
      this.dstRate = e.target.value;
      this.calculateRateDst(
        srcSelect,
        srcInput,
        dstSelect,
        dstInput,
        calculation
      );
    };
    dstInput.onchange = (e) => {
      this.dstInputValue = e.target.value;
      this.calculateRateDst(
        srcSelect,
        srcInput,
        dstSelect,
        dstInput,
        calculation
      );
    };
    this.swpEl.onclick = (e) => {
      [this.srcRate, this.dstRate] = [this.dstRate, this.srcRate];
      [srcSelect.value, dstSelect.value] = [dstSelect.value, srcSelect.value];
      this.calculateRateSrc(
        srcSelect,
        srcInput,
        dstSelect,
        dstInput,
        calculation
      );
    };
  };

  //? Ripple Effect
  createRipple = (event) => {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };
  initializeRipple = () => {
    const buttons = document.getElementsByClassName("swap");
    for (const button of buttons) {
      button.addEventListener("click", this.createRipple);
    }
  };

  //? Fetch Data From API
  fetchData = async () => {
    await this.makeRequest(this.reqUrl);
  };

  makeRequest = async (url) => {
    try {
      const { data } = await axios.get(url);
      this.data = data;
    } catch (error) {
      console.log(error);
    }
  };

  //? Initializing Calculator
  createOption = (parentEl, name, value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = name;
    parentEl.appendChild(option);
  };

  initializeCalculator = async () => {
    await this.fetchData();
    const { conversion_rates: conversionRates } = this.data;
    const srcSelect = this.srcEl.firstElementChild;
    const srcInput = this.srcEl.lastElementChild;
    const dstSelect = this.dstEl.firstElementChild;
    const dstInput = this.dstEl.lastElementChild;
    const calculation = this.calEl;

    for (const key in conversionRates) {
      if (Object.hasOwnProperty.call(conversionRates, key)) {
        const rate = conversionRates[key];
        this.createOption(srcSelect, key, rate);
        this.createOption(dstSelect, key, rate);
      }
    }
    calculation.textContent = `${srcInput.value} ${
      srcSelect.options[srcSelect.selectedIndex].text
    } = ${dstInput.value} ${dstSelect.options[dstSelect.selectedIndex].text}`;
  };
}
