const holderInput = document.getElementById("holder");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvvInput = document.getElementById("cvv");

console.log(cvvInput);

const form = document.querySelector("form");

const carData = {
  holder: "",
  number: "",
  isNumberValid: false,
  month: "",
  isMonthValid: false,
  year: "",
  isYearValid: false,
  cvv: "",
  isCvvValid: false,
};

const numberDisplay = document.querySelector(".card-number");
const nameDisplay = document.querySelector("#holder-name");
const monthDisplay = document.querySelector("#card-month");
const yearDisplay = document.querySelector("#card-year");
const cvvDisplay = document.querySelector(".cvv");

const numberError = document.querySelector("#number-error");
const dateError = document.querySelector("#date-error");
const cvvError = document.querySelector("#cvv-error");

function render() {
  numberDisplay.textContent = carData.number || "#### #### #### ####";
  nameDisplay.textContent = carData.holder || "FULL NAME";
  monthDisplay.textContent = carData.month || "MM";
  yearDisplay.textContent = carData.year || "YY";
  cvvDisplay.textContent = carData.cvv || "###";
}

render();

// handle holder input event
holderInput.addEventListener("input", (e) => {
  carData.holder = e.target.value;
  render();
});

// handle number input event
numberInput.addEventListener("input", (e) => {
  carData.number = e.target.value;

  // check if the number does ontains only numbers 0-9
  // using regex (regular expression) check regex101.com
  if (!/^[0-9]*$/.test(carData.number)) {
    // show error
    numberError.classList.remove("hidden");
    numberInput.classList.add("error");
    carData.isNumberValid = false;
  } else {
    // hide error
    numberError.classList.add("hidden");
    numberInput.classList.remove("error");
    carData.isNumberValid = true;
  }

  // add zero to the end of the string
  carData.number = carData.number.padEnd(16, "#");

  // add a space after every 4 characters without regex
  carData.number = carData.number
    .split("")
    .map((char, i) => {
      if ((i + 1) % 4 === 0) {
        return char + " ";
      } else {
        return char;
      }
    })
    .join("");

  // or simpler using regex check regex101.com
  // carData.number = carData.number.replace(/(.{4})/g, "$1 ");

  render();
});

// handle number input event
monthInput.addEventListener("input", (e) => {
  carData.month = e.target.value;

  // check if the number does ontains only numbers 0-9
  // using regex (regular expression) check regex101.com
  if (!/^[0-9]*$/.test(carData.month)) {
    // show error
    monthInput.classList.add("error");
    dateError.classList.remove("hidden");
    dateError.textContent = "Invalid month";
    carData.isMonthValid = false;
  } else {
    // hide error
    monthInput.classList.remove("error");
    dateError.classList.add("hidden");
    carData.isMonthValid = true;
  }

  render();
});

// handle number input event
yearInput.addEventListener("input", (e) => {
  carData.year = e.target.value;

  // check if the number does ontains only numbers 0-9
  // using regex (regular expression) check regex101.com
  if (!/^[0-9]*$/.test(carData.year)) {
    // show error
    yearInput.classList.add("error");
    dateError.classList.remove("hidden");
    dateError.textContent = "Invalid year";
    carData.isYearValid = false;
  } else {
    // hide error
    yearInput.classList.remove("error");
    dateError.classList.add("hidden");
    carData.isYearValid = true;
  }

  render();
});

// handle number input event
cvvInput.addEventListener("input", (e) => {
  carData.cvv = e.target.value;

  // check if the number does ontains only numbers 0-9
  // using regex (regular expression) check regex101.com
  if (!/^[0-9]*$/.test(carData.cvv)) {
    // show error
    cvvInput.classList.add("error");
    cvvError.classList.remove("hidden");
    cvvError.textContent = "Invalid cvv Numbers only";
    carData.isCvvValid = false;
  } else {
    // hide error
    cvvInput.classList.remove("error");
    cvvError.classList.add("hidden");
    carData.isCvvValid = true;
  }
  render();
});

const successCard = document.querySelector(".success");

// handle form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // check if all inputs are valid
  if (
    carData.isNumberValid &&
    carData.isMonthValid &&
    carData.isYearValid &&
    carData.isCvvValid
  ) {
    // show success card
    successCard.classList.remove("hidden");
    // hide form
    form.classList.add("hidden");
  } else {
    if (!carData.isNumberValid) {
      shake(numberInput);
    }

    if (!carData.isMonthValid) {
      shake(monthInput);
    }

    if (!carData.isYearValid) {
      shake(yearInput);
    }

    if (!carData.isCvvValid) {
      shake(cvvInput);
    }
  }
});

function shake(element) {
  element.classList.add("shake");

  setTimeout(() => {
    element.classList.remove("shake");
  }, 500);
}
