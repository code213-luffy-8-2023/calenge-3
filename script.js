const nameInput = document.getElementById("holder");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvvInput = document.getElementById("cvv");

const form = document.querySelector("form");

const numberDisplay = document.getElementById("card-number");
const nameDisplay = document.getElementById("name");
const monthDisplay = document.getElementById("card-month");
const yearDisplay = document.getElementById("card-year");
const cvvDisplay = document.getElementById("card-cvv");

const numberError = document.getElementById("number-error");
const dateError = document.getElementById("date-error");

const cardDetails = {
  name: "",
  nameError: false,
  number: "",
  numberError: false,
  month: "",
  monthError: false,
  year: "",
  yearError: false,
  cvv: "",
  cvvError: false,
};

function render() {
  numberDisplay.innerText = cardDetails.number || "0000 0000 0000 0000";
  nameDisplay.innerText = cardDetails.name || "FULL NAME";
  monthDisplay.innerText = cardDetails.month || "MM";
  yearDisplay.innerText = cardDetails.year || "YY";
  cvvDisplay.innerText = cardDetails.cvv || "000";
}

render();

nameInput.addEventListener("input", (e) => {
  cardDetails.name = nameInput.value;

  render();
});

const onlyNumbersRegex = /^[0-9]*$/;

numberInput.addEventListener("input", (e) => {
  if (!onlyNumbersRegex.test(numberInput.value)) {
    console.log("invalid input");
    numberInput.classList.add("error");
    numberError.classList.remove("hidden");
    cardDetails.numberError = true;
  } else {
    numberInput.classList.remove("error");
    numberError.classList.add("hidden");
    cardDetails.numberError = false;
  }

  cardDetails.number = numberInput.value.padEnd(16, "0");

  // add space every 4 digits using regex
  // cardDetails.number = cardDetails.number.replace(/(.{4})/g, "$1 ");
  // 0000000000000000

  cardDetails.number = cardDetails.number
    .split("")
    .map((value, index, array) => {
      if ((index + 1) % 4 === 0) {
        return value + " ";
      } else {
        return value;
      }
    })
    .join("");

  render();
});

monthInput.addEventListener("input", (e) => {
  cardDetails.month = monthInput.value.padStart(2, "0");

  if (!onlyNumbersRegex.test(monthInput.value)) {
    // error
    dateError.classList.remove("hidden");
    monthInput.classList.add("error");
    dateError.innerText = "Month Invalid, numbers only";
    cardDetails.monthError = true;
  } else if (monthInput.value > 12 || monthInput.value < 1) {
    dateError.classList.remove("hidden");
    monthInput.classList.add("error");
    dateError.innerText = "Month Invalid, 1-12";
    cardDetails.monthError = true;
  } else {
    // valid
    dateError.classList.add("hidden");
    monthInput.classList.remove("error");
    cardDetails.monthError = false;
  }

  render();
});

yearInput.addEventListener("input", (e) => {
  cardDetails.year = yearInput.value.padStart(2, "0");

  if (!onlyNumbersRegex.test(yearInput.value)) {
    // error
    dateError.classList.remove("hidden");
    yearInput.classList.add("error");
    dateError.innerText = "Year Invalid, numbers only";
    cardDetails.yearError = true;
  } else if (yearInput.value < 22 || Number(yearInput.value) > 99) {
    dateError.classList.remove("hidden");
    yearInput.classList.add("error");
    dateError.innerText = "Year Invalid, 22-99";
    cardDetails.yearError = true;
  } else {
    // valid
    dateError.classList.add("hidden");
    yearInput.classList.remove("error");
    cardDetails.yearError = false;
  }

  render();
});

const cvvError = document.getElementById("cvv-error");

cvvInput.addEventListener("input", (e) => {
  cardDetails.cvv = cvvInput.value.padEnd(3, "0");

  if (!cvvInput.value) {
    cvvError.classList.remove("hidden");
    cvvInput.classList.add("error");
    cardDetails.cvvError = true;
  } else {
    cvvError.classList.add("hidden");
    cvvInput.classList.remove("error");
    cardDetails.cvvError = false;
  }

  render();
});

const success = document.querySelector(".success");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cardDetails.numberError) {
    shakeElement(numberInput);
    shakeElement(numberError);
    return;
  }

  if (cardDetails.monthError) {
    shakeElement(monthInput);
    shakeElement(dateError);
    return;
  }

  if (cardDetails.yearError) {
    shakeElement(yearInput);
    shakeElement(dateError);
    return;
  }

  if (cardDetails.cvvError) {
    shakeElement(cvvInput);
    shakeElement(cvvError);
    return;
  }

  form.classList.add("hidden");
  success.classList.remove("hidden");
});

function shakeElement(element) {
  element.classList.add("shake-me");
  setTimeout(() => {
    element.classList.remove("shake-me");
  }, 500);
}
