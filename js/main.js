let defDigit = '$0.00';
let tipAmount = 0.00;
let tipArr = ['5', '10', '15', '25', '50'];
tipArr.reverse();

const tipBox = document.getElementById('tip-box');

function addTip (index, value) {
  tipBox.innerHTML =
  `
  <label for="radio-${index}" class="radio radio-${index}"><span>${value}%</span><input id="radio-${index}" type="radio" name="tip" value="${value}"></label>`
  + tipBox.innerHTML
}

for (i = 0; i < tipArr.length; i++) {
  addTip(i+1, tipArr[i]);
}

const inputBill = document.getElementById('bill');
const inputPeople = document.getElementById('people');
const inputCustom = document.getElementById('tip');
const inputRadio = document.getElementsByName('tip');
const resetButton = document.getElementById("reset");
const tipTotal = document.getElementById('amount');
const total = document.getElementById('total');
const error = document.getElementById('error');


inputBill.addEventListener('input', () => {
  if (isNaN(parseFloat(inputBill.value))) {
    total.innerHTML = defDigit;
  } else {
    if (inputCustom.value != '') {
      calculateCustom();
    } else {
      calculateTip();
    }
    calculateTotal();
  }
});

inputPeople.addEventListener('input', () => {

  if (isNaN(parseFloat(inputPeople.value))) {
    inputPeople.classList.add("error");
    error.style.display = "block";
    total.innerHTML = defDigit;
  } else {
    inputPeople.classList.remove("error");
    error.style.display = "none";
    
    if (inputCustom.value != '') {
      calculateCustom();
    } else {
      calculateTip();
    }
    calculateTotal();
  }
});

inputCustom.addEventListener('input', () => {
  if (isNaN(parseFloat(inputCustom.value))) {
    tipAmount = 0;
    tipTotal.innerHTML = defDigit;
    calculateTotal();
  } else {
    calculateCustom();
    calculateTotal();
  }
});

inputCustom.addEventListener('click', () => {
  if (inputCustom.value != '') {
    tipTotal.innerHTML = '$' + parseFloat(inputCustom.value / inputPeople.value).toFixed(2);
  } else {
    tipAmount = 0;
    tipTotal.innerHTML = defDigit;
  }
    calculateTotal();
  for (i = 0; i < inputRadio.length; i++) {
    inputRadio[i].checked = false;
    inputRadio[i].parentElement.classList.remove("checked");
  }
})

resetButton.addEventListener('click', () => {
  
  inputBill.value = '';
  inputCustom.value = '';
  inputPeople.value = '';
  tipTotal.innerHTML = defDigit;
  calculateTotal();
  for (i = 0; i < inputRadio.length; i++) {
    inputRadio[i].checked = false;
    inputRadio[i].parentElement.classList.remove("checked");
  }
  resetButton.disabled = true;
})

for (i = 0; i < inputRadio.length; i++) {
    inputRadio[i].addEventListener('change', function() {
      inputCustom.value = '';
      calculateTip();
      calculateTotal();
      this.parentElement.classList.add("checked");
      for (i = 0; i < inputRadio.length; i++) {
        if (inputRadio[i] != this) {
        inputRadio[i].parentElement.classList.remove("checked");
        }
      }
    });
}

// Math

function calculateTip () {
    const tipCheck = document.querySelector('input[name="tip"]:checked').value;
    if (tipCheck != null) {
    let result = inputBill.value / inputPeople.value * tipCheck / 100;
    tipAmount = result;
    tipTotal.innerHTML = '$' + result.toFixed(2);
    if (inputBill.value == '') {
      tipTotal.innerHTML = defDigit;
    }
  }
}

function calculateTotal() {
  resetButton.disabled = false;
    let result = parseFloat(inputBill.value) / parseFloat(inputPeople.value) + parseFloat(tipAmount);
    total.innerHTML = '$' + result.toFixed(2);

    if (isNaN(result)) {
      total.innerHTML = defDigit;
    }
}

function calculateCustom() {
  tipTotal.innerHTML = '$' + parseFloat(inputCustom.value / inputPeople.value).toFixed(2);
  tipAmount = parseFloat(inputCustom.value / inputPeople.value).toFixed(2);
  if (tipAmount == Infinity) {
    tipTotal.innerHTML = defDigit;
  }
}